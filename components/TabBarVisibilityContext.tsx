import React, { createContext, useContext, useRef } from "react";
import { Animated } from "react-native";

type TabBarContextType = {
    translateY: Animated.Value;
    hideTabBar: () => void;
    showTabBar: () => void;
};

const TabBarContext = createContext<TabBarContextType | null>(null);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
    const translateY = useRef(new Animated.Value(0)).current;

    const hideTabBar = () => {
        Animated.timing(translateY, {
            toValue: 80, // adjust if your tab bar is taller
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const showTabBar = () => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TabBarContext.Provider value={{ translateY, hideTabBar, showTabBar }}>
            {children}
        </TabBarContext.Provider>
    );
};

export const useTabBar = () => {
    const ctx = useContext(TabBarContext);
    if (!ctx) throw new Error("useTabBar must be used inside TabBarProvider");
    return ctx;
};
