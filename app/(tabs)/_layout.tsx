import { Tabs } from "expo-router";
import React from "react";
import "../../global.css";
import { TabBar } from "@/components/TabBar";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Animated } from "react-native";
import { TabBarProvider, useTabBar } from "@/components/TabBarVisibilityContext";

function AnimatedTabBar(props: any) {
    const { translateY } = useTabBar();

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -20,
            }}
        >
            <TabBar {...props} />
        </Animated.View>
    );
}

export default function TabLayout() {
    return (
        <ThemeProvider value={DarkTheme}>
            <TabBarProvider>
                <Tabs
                    screenOptions={{
                        headerShown: true,
                    }}
                    tabBar={(props) => <AnimatedTabBar {...props} />}
                >
                    <Tabs.Screen
                        name="index"
                        options={{ title: "Stock", headerTitle: "Stock Price" }}
                    />
                    <Tabs.Screen
                        name="stockProfile"
                        options={{ title: "Profile", headerTitle: "Stock Profile" }}
                    />
                    <Tabs.Screen
                        name="stockWatchList"
                        options={{ title: "Monitoring", headerTitle: "Watch List" }}
                    />
                </Tabs>
            </TabBarProvider>
        </ThemeProvider>
    );
}
