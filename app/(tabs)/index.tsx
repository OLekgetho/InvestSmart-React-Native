import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView, Pressable} from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import {Link, Stack} from 'expo-router';
import Colors from "@/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import DatePicker from '@react-native-community/datetimepicker';
import {useState} from "react";
import axios from "axios";



export default function HomeScreen() {
    const getPercentageStyle = (value: number) => ({
        color: value < 0 ? "red" : "green",
    });
    const [myDate, setMyDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const BASE_URL = "http://192.168.1.105:8085/api";

    const formatDate = (date: Date) =>
        date.toISOString().split("T")[0];

    const [stockPrices, setStockPrice] = useState<any | null>(null);
    const fetchStockPrices = async (symbol: string, date: Date) => {
        setLoading(true);
        setError(null);

        try {
            const formattedDate = date.toISOString().split("T")[0];

            const res = await axios.get(
                `${BASE_URL}/stock/${symbol}/${formattedDate}`
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

                  <ScrollView contentContainerStyle={styles.scrollContent} showsHorizontalScrollIndicator={false}>
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
                                          {stockPrices.currDay[0].symbol}
                                      </Text>
                                      <Text className="text-gray-500 text-xl font-bold">
                                          Apple Inc.
                                      </Text>
                                  </View>
                                  <View className="mt-7">
                                      <View style={styles.price}>
                                          {/*<Text className="text-white text-3xl font-bold ">*/}
                                          {/*    565.23*/}
                                          {/*</Text>*/}
                                          <Text className="text-white text-3xl font-bold ">
                                              {stockPrices.currDay[0].close}
                                          </Text>
                                          <Text className="text-gray-600 text-sm font-bold ml-2 ">
                                              USD
                                          </Text>
                                      </View>
                                      <View style={styles.title_percentage}>
                                        {/*<Text style={[styles.percentage, getPercentageStyle("+0.10")]}>+21.30</Text>*/}
                                        {/*<Text style={[styles.percentage2, getPercentageStyle("+0.10")]}>+0.10%</Text>*/}
                                        <Text style={[styles.percentage, getPercentageStyle(stockPrices.stockChange[0].amountChange)]}>
                                            {stockPrices.stockChange[0].amountChange.toFixed(2)}</Text>
                                        <Text style={[styles.percentage2, getPercentageStyle(stockPrices.stockChange[0].percentChange)]}>
                                            {stockPrices.stockChange[0].percentChange.toFixed(2)}%</Text>
                                      </View>
                                  </View>
                              </View>
                              {/*<View style={[styles.title_percentage,styles.percentage3]}>*/}
                              {/*    <Text style={[styles.percentage, getPercentageStyle("-812.32")]}>-812.32</Text>*/}
                              {/*    <Text style={[styles.percentage2, getPercentageStyle("-40%")]}>-40%</Text>*/}
                              {/*    <Text style={[styles.percentage2, getPercentageStyle("-40%")]}>past 4 years</Text>*/}
                              {/*</View>*/}
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
