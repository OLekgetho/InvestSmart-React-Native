import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

type ResultsFinance = {
    label: string;
    value: number;
    unit: string;
};

export type BalanceSheetItem = {
    key: string;
    label: string;
    value: number;
    unit: string;
};


type Props = {
    balanceSheet: Record<string, { label: string; value: number; unit: string }>;
};

export default function BalanceSheets({ balanceSheet }: Props) {
    if (!balanceSheet) return <Text style={{ color: "white" }}>No Balance Sheet Data</Text>;
    const data: BalanceSheetItem[] = Object.entries(balanceSheet).map(
        ([key, item]) => ({
            key,
            label: item.label,
            value: item.value,
            unit: item.unit,
        })
    );
    return (
        <View>
            <Text className="text-white text-2xl font-light border-b border-b-white">Balance Sheet</Text>
            {data.map((item) => (
                <View key={item.key} style={styles.row}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{formatCurrency(item.value, item.unit)}</Text>
                </View>
            ))}
        </View>

    );
}

const formatCurrency = (value: number, unit: string) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: unit,
        maximumFractionDigits: 0,
    }).format(value);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        alignItems: "center",
        borderBottomWidth: 1,           // bottom border
        borderBottomColor: "rgba(255,255,255,0.05)", // light/transparent white
    },
    label: {
        fontSize: 16,
        color: "#ffffff",
        flexShrink: 1, // allow wrapping
        flex: 1,
        flexWrap: "wrap",
        maxWidth: "60%"
    },
    value: {
        fontSize: 15,
        color: "#eae7e7",
        width: "35%",
        textAlign: "right",
    },
});
