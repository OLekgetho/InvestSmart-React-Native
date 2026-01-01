import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

type AnalystData = {
    current: number;
    low: number;
    high: number;
};

type AnalystProps = {
    symbol: string;
};

export default function Analyst({symbol}: AnalystProps) {
    const [data, setData] = useState<AnalystData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchedSymbol = React.useRef<string | null>(null);

    useEffect(() => {
        if (fetchedSymbol.current === symbol) return;

        fetchedSymbol.current = symbol;
        setLoading(true);

        fetch(`http://10.145.2.220:8085/api/stock/info/analyst/${symbol}`)
            .then(res => res.json())
            .then(json => {
                setData({
                    current: json.current,
                    low: json.low,
                    high: json.high,
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [symbol]);


    if (loading || !data) {
        return <ActivityIndicator />;
    }

    const { low, high, current } = data;

    const clampedCurrent = Math.min(Math.max(current, low), high);

    const position =
        ((clampedCurrent - low) / (high - low)) * 100;

    return (
        <View style={styles.container}>

            {/* Range Bar */}
            <View style={styles.bar}>
                <View
                    style={[
                        styles.currentMarker,
                        { left: `${position}%` },
                    ]}
                />
            </View>

            {/* Values */}
            <View style={styles.values}>
                <Text style={styles.label}>Low{"\n"}{low.toFixed(2)}</Text>
                {/*<Text style={styles.currentValue}>*/}
                {/*    Current{"\n"}{current.toFixed(2)}*/}
                {/*</Text>*/}
                <Text style={styles.label}>High{"\n"}{high.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
    },
    title: {
        color: "#e5e7eb",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    bar: {
        height: 8,
        backgroundColor: "#344255",
        borderRadius: 4,
        position: "relative",
        marginVertical: 20,
    },
    currentMarker: {
        position: "absolute",
        top: -10,
        width: 4,
        height: 28,
        backgroundColor: "#f18201",
        borderRadius: 2,
    },
    values: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        color: "#8e8d8d",
        fontSize: 12,
        textAlign: "center",
    },
    currentValue: {
        color: "#22c55e",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
});
