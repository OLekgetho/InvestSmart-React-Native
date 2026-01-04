import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView} from 'react-native';


import {Link, Stack} from 'expo-router';
import Colors from "@/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import {useRef, useState} from "react";
import {useTabBar} from "@/components/TabBarVisibilityContext";
import axios from "axios";
import {symbol} from "d3-shape";

type dataType = {
    marketCap: string,
    revenue: string,
    netIncome: string,
    fouryearNetIncomeAvg: string,
    trailingpe: string,
    pricetosaleratio: string,
    profitMarginTTM: string,
    fouryearProfitMargin: string,
    grossProfitMargin: string,
    freeCashFlowTTM: string,
    fouryearFreeCashFlow: string,
    pEFreeCashFlow: string,
    enterpriseValue: string,
    fcf_to_net_income: string,
    netDebt: string,
    revenue_cagr: string,
    net_income_cagr: string,
    fcf_cagr: string,

}

export default function StockMetrics() {
    const lastY = useRef(0);
    const { hideTabBar, showTabBar } = useTabBar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stockPrices, setStockPrice] = useState<any | null>(null);
    const BASE_URL = "http://192.168.1.105:8085/api";
    // const BASE_URL = "http://10.90.255.220:8085/api";
    // const BASE_URL = "http://10.145.2.220:8085/api";

    const fetchStockPrices = async (symbol: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get<dataType>(`${BASE_URL}/stock/info/personalKPI/${symbol}`
            );

            setStockPrice(res.data);
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
            <SafeAreaView style={[styles.container]} edges={['top']}>
                <View style={[styles.container]}>

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsHorizontalScrollIndicator={false}
                        onScroll={(e) => {
                            const y = e.nativeEvent.contentOffset.y;

                            if (y > lastY.current + 6) hideTabBar();
                            else if (y < lastY.current - 6) showTabBar();

                            lastY.current = y;
                        }}
                        scrollEventThrottle={500}>
                        <Text className=" mt-safe-or-12  mx-auto text-white text-3xl font-bold">Foundational Metics</Text>
                        <View className="mt-5">
                            <SearchBar
                                placeholder="Search a Stock"
                                onSubmit={(symbol: string) =>
                                    fetchStockPrices(symbol)
                                }
                            />
                            {stockPrices && (
                            <View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname}>
                                                Market Cap:
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.marketCap}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                            Market Capitalization is the amount of money it would take to buy every share that is currently outstanding at the current market price.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname}>
                                                Revenue TTM
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.revenue}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                            Revenue TTM (Trailing Twelve Months) is a financial metric representing a company's total revenue generated over the past 12 consecutive months.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname}>
                                                Net Income TTM
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.netIncome}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                            Net Income TTM (Trailing Twelve Months) is the total, cumulative profit a company has generated over the last four consecutive quarters or the most recent 12-month period.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                4 Years Net Income Average
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.fouryearNetIncomeAvg}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Trailing PE
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.trailingpe}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>The Price-to-Earnings Ratio is a popular tool for getting a general idea of how expensive or inexpensive a stock may be.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Price-to-Sale Ratio
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.pricetosaleratio}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>The price-to-sales (P/S) ratio is a valuation metric that compares a company's stock price to its revenue per share, indicating how much investors are willing to pay for each dollar of a company's sales
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Profit Margin TTM
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.profitMarginTTM}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>Profit Margin TTM (Trailing Twelve Months) is a financial metric measuring a company's net income as a percentage of revenue over the past 12 consecutive months.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                4 Year Profit Margin Average
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.fouryearProfitMargin}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Gross Profit Margin
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.grossProfitMargin}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                            Gross Profit Margin is a percentage showing how much revenue remains after subtracting the direct costs (Cost of Goods Sold - COGS) of producing and selling a product or service, indicating operational efficiency and pricing power.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Free Cash Flow TTM
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.freeCashFlowTTM}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                            Free Cash Flow (FCF) - Formula, Calculation, & UsesFree Cash Flow (FCF) TTM (Trailing Twelve Months) is the cash a company generates over the past year after accounting for cash outflows to support operations and maintain capital assets (CapEx).
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                4-Year Free Cash Flow Average
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.fouryearFreeCashFlow}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                               P/E Free Cash Flow
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.pEFreeCashFlow}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                            Price to Free Cash Flow (P/FCF) is an equity valuation metric that compares a company's market price per share to its free cash flow (FCF) per share, indicating how much investors pay for $1 of actual cash generated.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Enterprise Value
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.enterpriseValue}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Free Cash Flow to Net Income
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.fcf_to_net_income}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Net Debt
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.netDebt}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Revenue Compound Annual Growth Rate
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.revenue_cagr}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Net Income Compound Annual Growth Rate
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.net_income_cagr}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.kpicontainer}>
                                    <View style={styles.kpicontainers}>
                                        <View style={styles.kpi}>
                                            <Text style={styles.kpiname} numberOfLines={0} ellipsizeMode="tail">
                                                Free Cash Flow Compound Annual Growth Rate
                                            </Text>
                                        </View>
                                        <View style={styles.kpinum}>
                                            <Text style={styles.kpinums}>
                                                {stockPrices.fcf_cagr}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.kpidescrip}>
                                        <Text style={styles.kpidescription}>
                                        </Text>
                                    </View>
                                </View>

                            </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
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
    kpicontainer: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 19,
        borderRadius: 12,
        height: "auto",
        marginTop:20,
    },
    kpicontainers: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start", // Align to top so wrapped text looks correct
    },
    kpi: {
        flex: 1,                  // Take remaining space
        marginRight: 10,          // Small space before number
    },
    kpiname: {
        color: 'white',
        fontWeight: '900',
        fontSize: 18,
        // remove flexWrap (Text wraps by default)
    },
    kpinum: {
        justifyContent: 'center', // vertically centered
        // don't add flex
    },

    kpinums: {
        fontWeight: 900,
        fontSize: 16.5,
        color: 'white',
    },
    kpidescription: {
        fontSize: 13,
        color: 'grey',
        fontStyle: 'italic',
    },
    kpidescrip: {
        marginTop:15
    }
})