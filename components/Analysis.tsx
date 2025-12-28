import {View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity} from "react-native";
import Colors from "@/Colors";
import {useState} from "react";
import axios from "axios";

type AnalysisProps = {
    stockData: {
        website: string;
        phone: string;
        marketCap: string;
        fullTimeEmployees: string;
        trailingPE: string;
        forwardPE: string;
        marketState: string;
    } | null;
};

const Analysis = ({ stockData }: AnalysisProps) => {
// const Analysis = () => {
    const getPercentageStyle = (value: string) => ({
        color: value.startsWith("-") ? "red" : "green",
    });
    const formatNumber = (num: string | number) => {
        if (!num) return "";
        return new Intl.NumberFormat().format(Number(num));
    };


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = "http://192.168.1.105:8085/api";

    return (
        <View style={styles.container}>
            <View className='flex-1 mt-3'>
                {stockData && (
                <View style={styles.cardWrapper}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.block}>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(stockData?.website)}
                        >
                            <Text style={styles.title}>Website</Text>
                            <View style={styles.number} >
                                {/*<Text style={styles.price}>{stockData.website}</Text>*/}
                                {/*<Text style={styles.price}>384 217 213</Text>*/}
                                {/*<Text style={[styles.percentage, getPercentageStyle("-15")]}>-15%</Text>*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Market State</Text>
                        <View style={styles.number} >
                            <Text style={styles.price1}>{stockData.marketState}</Text>
                            {/*<Text style={styles.price1}>Stock</Text>*/}
                        </View>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Market Cap</Text>
                        <View style={styles.number} >
                            <Text style={styles.price}>{formatNumber(stockData.marketCap)}</Text>
                            {/*<Text style={styles.price}>2 343 232 431</Text>*/}
                            {/*<Text style={[styles.percentage, getPercentageStyle("+20")]}>+20%</Text>*/}
                        </View>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Phone Number</Text>
                        <View style={styles.number} >
                            <Text style={styles.price}>{stockData.phone}</Text>
                            {/*<Text style={styles.price}>033 423 1234</Text>*/}
                        </View>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Total Employees</Text>
                        <View style={styles.number} >
                            <Text style={styles.price}>{formatNumber(stockData.fullTimeEmployees)}</Text>
                            {/*<Text style={styles.price}>144 533</Text>*/}
                        </View>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Trailing PE</Text>
                        <View style={styles.number} >
                            <Text style={styles.price}>{formatNumber(stockData.trailingPE)}</Text>
                            {/*<Text style={styles.price}>144 533</Text>*/}
                        </View>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Forward PE</Text>
                        <View style={styles.number} >
                            <Text style={styles.price}>{formatNumber(stockData.forwardPE)}</Text>
                            {/*<Text style={styles.price}>144 533</Text>*/}
                        </View>
                    </View>
                    </ScrollView>
                </View>
                )}
            </View>
    </View>
    )
}

export default Analysis

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },

    container: {
        justifyContent: 'space-between',

    },

    block: {
        borderWidth : 2,
        width: 160,
        height: 130,
        padding: 16,
        borderRadius: 25,
        marginRight: 12,
        justifyContent: "space-evenly",
        gap: 10,
        backgroundColor: "#ffffff",

    },
    title: {
        color: "black",
        fontWeight: "800",
        fontSize: 19,

    },

    heading: {
        color: "white",
        fontWeight: "600",
        fontSize: 17,

    },

    price: {
        color: "black",
        fontSize: 14,
        fontWeight: "300",
    },

    price1: {
        color: "black",
        fontSize: 14,
        fontWeight: "300",
        textTransform: "capitalize",
    },
    percentage: {
        fontSize: 12,
        fontWeight: "200",
    },

    number: {

    }

})