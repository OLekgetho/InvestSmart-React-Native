import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView} from 'react-native';


import {Link, Stack} from 'expo-router';
import Colors from "@/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";

export default function HomeScreen() {
    const getPercentageStyle = (value: string) => ({
        color: value.startsWith("-") ? "red" : "green",
    });
  return (
      <>
          <Stack.Screen options={{ headerShown: false }} />
          <SafeAreaView style={[styles.container]} edges={['top']}>
              <View style={[styles.container]}>

                  <ScrollView contentContainerStyle={styles.scrollContent} showsHorizontalScrollIndicator={false}>
                      <Text className=" mt-safe-or-12  mx-auto text-white text-3xl font-bold">Stock Price</Text>

                      <View className="mt-5">
                          <SearchBar
                              placeholder="Search a Stock"
                              onSubmit={() => {}}
                          />

                          <View>
                              <View style={styles.title}>
                                  <View>
                                      <Text className="text-white text-4xl mt-7 font-bold">
                                          AAPL
                                      </Text>
                                      <Text className="text-gray-500 text-xl font-bold">
                                          Apple Inc.
                                      </Text>
                                  </View>
                                  <View className="mt-auto">
                                      <View style={styles.price}>
                                          <Text className="text-white text-3xl font-bold ">
                                              565.23
                                          </Text>
                                          <Text className="text-gray-600 text-xl font-bold ml-2 ">
                                              USD
                                          </Text>
                                      </View>
                                      <View style={styles.title_percentage}>
                                        <Text style={[styles.percentage, getPercentageStyle("+0.10")]}>+21.30</Text>
                                        <Text style={[styles.percentage2, getPercentageStyle("+0.10")]}>+0.10%</Text>
                                      </View>
                                  </View>
                              </View>
                              <View style={[styles.title_percentage,styles.percentage3]}>
                                  <Text style={[styles.percentage, getPercentageStyle("-812.32")]}>-812.32</Text>
                                  <Text style={[styles.percentage2, getPercentageStyle("-40%")]}>-40%</Text>
                                  <Text style={[styles.percentage2, getPercentageStyle("-40%")]}>past 4 years</Text>

                              </View>
                          </View>
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
    }

})
