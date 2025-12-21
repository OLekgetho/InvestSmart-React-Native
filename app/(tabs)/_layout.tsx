import { Tabs } from 'expo-router';
import React from 'react';
import "../../global.css";
import HomeScreen from "@/app/(tabs)/index";
import {TabBar} from "@/components/TabBar";
import {DarkTheme, ThemeProvider} from "@react-navigation/native";

export default function TabLayout() {


  return (
      <ThemeProvider value={DarkTheme}>
        <Tabs tabBar={(props) => <TabBar {...props} />}>
            <Tabs.Screen name="index" options={{title: "Stock", headerTitle: "Stock Price"}}  />
            <Tabs.Screen name="stockProfile" options={{title: "Profile", headerTitle: "Stock Profile"}} />
            <Tabs.Screen name="stockWatchList" options={{title: "Monitoring", headerTitle: "Watch List"}} />
        </Tabs>
      </ThemeProvider>
  );
}
