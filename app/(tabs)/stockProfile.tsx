import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView, ActivityIndicator, Button, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Link, router, Stack} from 'expo-router';
import Colors from "@/Colors";
import SearchBar from "@/components/SearchBar";
import {useState} from "react";
import axios from "axios";
import Analysis from "@/components/Analysis";
import AnimatedButtonBar from "@/components/AnimatedButtonBar";
import News from "@/components/News";
import BalanceSheet from "@/components/BalanceSheet";
import IncomeStatement from "@/components/IncomeStatement";
import CashFlowStatement from "@/components/CashFlowStatement";
import BalanceSheets from "@/components/BalanceSheets";

type dataType = {
    ticker: string;
    name: string;
    currency_name: string;
    locale: string;
    market: string;
    phone_number: string;
    market_cap: string;
    total_employees: string;
    share_class_shares_outstanding: string;
};

export default function StockProfile() {
    const [active, setActive] = useState(0);
    const [stockData, setStockData] = useState<dataType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = "http://192.168.1.105:8085/api";

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
                axios.get<dataType>(`${BASE_URL}/profile/${symbol}`),
                axios.get(`${BASE_URL}/profile/finance/${symbol}`)
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



    return (
    <>
        <Stack.Screen options={{ headerShown: false }} />

        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text className="mt-safe-or-12 mx-auto text-white text-3xl font-bold">
                    Stock Profile
                </Text>

                <View className="mt-5">
                    <SearchBar
                        placeholder="Search a Stock"
                        onSubmit={fetchStockProfile}
                    />
                    {stockData && (
                    <View>

                        <Text className="text-white text-3xl mt-7 font-bold">
                            {stockData.name}
                        </Text>
                        <View style={styles.sym}>
                            <Text className="text-gray-400 text-md mt-3">{stockData.ticker}</Text>
                            <Text className="text-gray-400 text-md mt-3 mx-1">/</Text>
                            <Text className="text-gray-400 text-md mt-3 uppercase">{stockData.locale}</Text>
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
                            <BalanceSheets balanceSheet={financials.balance_sheet} />
                        )}
                        {active === 1 && financials && (
                            <IncomeStatement incomeStatement={financials.income_statement} />
                        )}
                        {active === 2 && financials && (
                            <CashFlowStatement cashFlowStatement={financials.cash_flow_statement} />
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
});
