import { Image } from 'expo-image';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Button,
    Pressable,
    Modal,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Link, router, Stack} from 'expo-router';
import Colors from "@/Colors";
import SearchBar from "@/components/SearchBar";
import {useRef, useState} from "react";
import axios from "axios";
import Analysis from "@/components/Analysis";
import AnimatedButtonBar from "@/components/AnimatedButtonBar";
import News from "@/components/News";
import BalanceSheet from "@/components/BalanceSheet";
import IncomeStatement from "@/components/IncomeStatement";
import CashFlowStatement from "@/components/CashFlowStatement";
import BalanceSheets from "@/components/BalanceSheets";
import {useTabBar} from "@/components/TabBarVisibilityContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DatePicker from "@react-native-community/datetimepicker";
import IndexAISummary from "@/components/IndexAISummary";
import FinancialsAISummary from "@/components/FinancialsAISummary";
import {symbol} from "d3-shape";
import Baseapi from "@/api/Baseapi";

type dataType = {
    symbol: string;
    shortName: string;
    currency: string;
    country: string;
    marketState: string;
    phone: string;
    website: string;
    marketCap: string;
    fullTimeEmployees: string;
    trailingPE: string;
    forwardPE: string;
};

export default function StockProfile() {
    const [active, setActive] = useState(0);
    const [stockData, setStockData] = useState<dataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = "http://192.168.1.105:8085/api";
    // const BASE_URL = "http://10.145.2.220:8085/api";
    // const BASE_URL = "http://10.90.255.220:8085/api";



    const buttons = [
        { label: 'Balance'},
        { label: 'Income'},
        { label: 'Cash'},
    ];

    const handleButtonPress = (index: number) => {
        setActive(index);// Navigate to the TSX page
    };

    const [financials, setFinancials] = useState<any | null>(null);

    const fetchStockProfile = async (symbol: string) => {
        setLoading(true);
        setError(null);

        try {
            const [profileRes, financeRes] = await Promise.all([
                axios.get<dataType>(`${Baseapi.API_BASE_URL}/stock/info/profile/${symbol}`),
                axios.get(`${Baseapi.API_BASE_URL}/profile/finance/${symbol}`)
            ]);

            setStockData(profileRes.data);
            setFinancials(financeRes.data.results?.[0]?.financials || null);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const lastY = useRef(0);
    const { hideTabBar, showTabBar } = useTabBar();
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <>
        <Stack.Screen options={{ headerShown: false }} />

        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={(e) => {
                    const y = e.nativeEvent.contentOffset.y;

                    if (y > lastY.current + 6) hideTabBar();
                    else if (y < lastY.current - 6) showTabBar();

                    lastY.current = y;
                }}
                scrollEventThrottle={500}
            >
                <Text className="mt-safe-or-12 mx-auto text-white text-3xl font-bold">
                    Stock Profile
                </Text>

                <View className="mt-5">
                    <View style={styles.top_title}>
                        <View style={styles.searchContainer}>
                            <SearchBar
                                placeholder="Search a Stock"
                                onSubmit={fetchStockProfile}
                            />
                        </View>

                        <View className="ml-4">

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                {stockData && (
                                    <FinancialsAISummary
                                        onClose={() => setModalVisible(false)}
                                        symbol={stockData.symbol}
                                    />
                                )}
                            </Modal>

                            <Pressable onPress={() => setModalVisible(true)}>
                                <MaterialCommunityIcons name="robot-confused-outline" size={24}  color={modalVisible ? "gray" : "white"}/>
                            </Pressable>

                        </View>
                    </View>
                    {stockData && (
                    <View>

                        <Text className="text-white text-3xl mt-7 font-bold">
                            {stockData.shortName}
                        </Text>
                        <View style={styles.sym}>
                            <Text className="text-gray-500 text-md mt-3">{stockData.symbol}</Text>
                            <Text className="text-gray-500 text-md mt-3 mx-1">/</Text>
                            <Text className="text-gray-500 text-md mt-3 uppercase">{stockData.country}</Text>
                        </View>
                        <View style={[styles.section]}>
                            <Text className="text-white text-xl font-bold">
                                Analysis
                            </Text>
                            <Analysis stockData={stockData}/>
                        </View>

                    <View style={styles.section}>
                        <AnimatedButtonBar
                            buttons={buttons}
                            activeIndex={active}
                            onChange={handleButtonPress}
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        {active === 0 && financials && (
                            <BalanceSheets symbol={stockData.symbol} />
                        )}
                        {active === 1 && financials && (
                            <IncomeStatement symbol={stockData.symbol} />
                        )}
                        {active === 2 && financials && (
                            <CashFlowStatement symbol={stockData.symbol} />
                        )}

                    </View>

                    </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },

    sym: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    section: {
        marginTop: 20,
    },
    top_title: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchContainer: {
        width: "86%",
    },
});
