import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView} from 'react-native';


import {Link, Stack} from 'expo-router';
import Colors from "@/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";

export default function HomeScreen() {
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
})
