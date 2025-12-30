import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView, Pressable} from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import {Link, Stack} from 'expo-router';
import Colors from "@/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import DatePicker from '@react-native-community/datetimepicker';
import {useRef, useState} from "react";
import axios from "axios";
import News from "@/components/News";
import Chart from "@/components/Chart";
import {useTabBar} from "@/components/TabBarVisibilityContext";

type dataType = {
    symbol: string;
    displayName: string;
    shortName: string;
    regularMarketPrice: number;
    regularMarketPreviousClose: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    fiveYrDate: string;
    fiveYrPercentage: number;
    fiveYrDiff: number;
    oneMonthDate: string;
    oneMonthPercentage: number;
    oneMonthDiff: number;
    oneMonthPrice: number;
};


export default function HomeScreen() {
    const getPercentageStyle = (value: number) => ({
        color: value < 0 ? "red" : "green",
    });
    const [myDate, setMyDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const BASE_URL = "http://192.168.1.105:8085/api";
    // const BASE_URL = "http://10.90.255.220:8085/api";
    const BASE_URL = "http://10.145.2.220:8085/api";

    const formatDate = (date: Date) =>
        date.toISOString().split("T")[0];

    const [stockPrices, setStockPrice] = useState<any | null>(null);
    const fetchStockPrices = async (symbol: string, date: Date) => {
        setLoading(true);
        setError(null);

        try {
            const formattedDate = date.toISOString().split("T")[0];

            const res = await axios.get<dataType>(`${BASE_URL}/stock/info/${symbol}`
            );

            setStockPrice(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const lastY = useRef(0);
    const { hideTabBar, showTabBar } = useTabBar();


    return (
      <>
          <Stack.Screen options={{ headerShown: false }} />
          <SafeAreaView style={[styles.container]} edges={['top']}>
              <View style={[styles.container]}>

                  <ScrollView contentContainerStyle={styles.scrollContent} showsHorizontalScrollIndicator={false}
                              onScroll={(e) => {
                                  const y = e.nativeEvent.contentOffset.y;

                                  if (y > lastY.current + 10) hideTabBar();
                                  else if (y < lastY.current - 10) showTabBar();

                                  lastY.current = y;
                              }}
                              scrollEventThrottle={200}>
                      <Text className=" mt-safe-or-12  mx-auto text-white text-3xl font-bold">Stock Price</Text>

                      <View className="mt-5">
                          <View style={styles.top_title}>

                              <View style={styles.searchContainer}>
                                  <SearchBar
                                      placeholder="Search a Stock"
                                      onSubmit={(symbol: string) =>
                                          fetchStockPrices(symbol, myDate)
                                      }
                                  />

                              </View>

                              <View className="ml-4">
                                  <Pressable onPress={() => setShow(true)}>
                                      <AntDesign name="calendar" size={24} color="white" />
                                  </Pressable>

                                  {show && (
                                      <DatePicker
                                          value={myDate}
                                          mode="date"
                                          display={Platform.OS === "ios" ? "spinner" : "default"}
                                          onChange={(event, selectedDate) => {
                                              setShow(false);
                                              if (selectedDate) setMyDate(selectedDate);
                                          }}
                                      />
                                  )}
                              </View>
                          </View>
                          {stockPrices && (
                          <View>

                                  <View style={styles.title}>
                                  <View>
                                      {/*<Text className="text-white text-4xl mt-7 font-bold">*/}
                                      {/*    AAPL*/}
                                      {/*</Text>*/}
                                      <Text className="text-white text-4xl mt-7 font-bold">
                                          {stockPrices.symbol}
                                      </Text>
                                      <Text className="text-gray-500 text-xl font-bold">
                                          {stockPrices.shortName}
                                      </Text>
                                  </View>
                                  <View className="mt-7">
                                      <View style={styles.price}>
                                          {/*<Text className="text-white text-3xl font-bold ">*/}
                                          {/*    565.23*/}
                                          {/*</Text>*/}
                                          <Text className="text-white text-3xl font-bold ">
                                              {stockPrices.regularMarketPrice.toFixed(2)}
                                          </Text>
                                          <Text className="text-gray-600 text-sm font-bold ml-2 ">
                                              USD
                                          </Text>
                                      </View>
                                      <View style={styles.title_percentage}>
                                        {/*<Text style={[styles.percentage, getPercentageStyle("+0.10")]}>+21.30</Text>*/}
                                        {/*<Text style={[styles.percentage2, getPercentageStyle("+0.10")]}>+0.10%</Text>*/}
                                        <Text style={[styles.percentage, getPercentageStyle(stockPrices.regularMarketChange)]}>
                                            {stockPrices.regularMarketChange.toFixed(2)}</Text>
                                        <Text style={[styles.percentage2, getPercentageStyle(stockPrices.regularMarketChangePercent)]}>
                                            {stockPrices.regularMarketChangePercent.toFixed(2)}%</Text>
                                      </View>
                                  </View>
                              </View>
                              <View style={[styles.title_percentage,styles.percentage3]}>
                                  <Text style={[styles.percentage, getPercentageStyle(stockPrices.fiveYrDiff)]}>{stockPrices.fiveYrDiff.toFixed(2)}</Text>
                                  <Text style={[styles.percentage2, getPercentageStyle(stockPrices.fiveYrPercentage)]}>{stockPrices.fiveYrPercentage.toFixed(2)}%</Text>
                                  <Text style={[styles.percentage2, getPercentageStyle(stockPrices.fiveYrPercentage)]}>change since {stockPrices.fiveYrDate}</Text>
                              </View>
                              <View style={[styles.title_percentage,styles.percentage3]}>
                                  <Text style={[styles.percentage, getPercentageStyle(stockPrices.oneMonthDiff)]}>{stockPrices.oneMonthDiff.toFixed(2)}</Text>
                                  <Text style={[styles.percentage2, getPercentageStyle(stockPrices.oneMonthPercentage)]}>{stockPrices.oneMonthPercentage.toFixed(2)}%</Text>
                                  <Text style={[styles.percentage2, getPercentageStyle(stockPrices.oneMonthPercentage)]}>change since a month ago</Text>
                              </View>
                              <View className="mt-5">
                                  <Text className="text-white text-2xl mt-4 font-medium"> Chart </Text>
                                  <Chart symbol={stockPrices.symbol}/>
                              </View>
                              <View className="mt-5">
                                  <Text className="text-white text-2xl mt-4 font-medium"> News </Text>
                                  <News symbol={stockPrices.symbol} />
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
        backgroundColor: Colors.black
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    top_title: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        flexDirection: "row",
        marginRight: 8,
        alignItems: "center",
    },
    percentage: {
        fontSize: 14,
        fontWeight: "500",
        alignItems: "center",
    },
    percentage2: {
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 11,
        alignItems: "center",
    },
    title_percentage: {
        flexDirection: "row",
        alignItems: "center",
    },
    percentage3: {
       marginTop: 7,
    },
    searchContainer: {
        width: "86%",
    },

})
