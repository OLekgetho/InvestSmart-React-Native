import { Image } from 'expo-image';
import {Platform, StyleSheet, View, Text, ScrollView} from 'react-native';


import {Link, Stack} from 'expo-router';
import Colors from "@/Colors";
import {SafeAreaView} from "react-native-safe-area-context";

export default function StockWatchList() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={[styles.container]} edges={['top']}>
                <View style={[styles.container]}>

                    <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false}>
                        <Text className=" mt-safe-or-12  mx-auto text-white text-3xl font-bold">Stock Watch List</Text>
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
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    }
})