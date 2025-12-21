import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

type ResultsFinance = {
    label: string;
    value: number;
    unit: string;
};

export type IncomeStatementItem = {
    key: string;
    label: string;
    value: number;
    unit: string;
};


type Props = {
    incomeStatement: Record<string, { label: string; value: number; unit: string }>;
};

export default function IncomeStatement({ incomeStatement }: Props) {
    if (!incomeStatement) return <Text style={{ color: "white" }}>No Income Statement Data</Text>;
    const data: IncomeStatementItem[] = Object.entries(incomeStatement).map(
        ([key, item]) => ({
            key,
            label: item.label,
            value: item.value,
            unit: item.unit,
        })
    );
    return (
        <View>
            <Text className="text-white text-2xl font-light border-b border-b-white">Income Statement</Text>
            {data.map((item) => (
                <View key={item.key} style={styles.row}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{formatCurrency(item.value, item.unit)}</Text>
                </View>
            ))}
        </View>

    );
}

const formatCurrency = (value: number, unit?: string) => {
    if (!unit || unit.length !== 3) {
        // Fallback: just show a plain number
        return value.toLocaleString("en-US");
    }

    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: unit,
            maximumFractionDigits: 0,
        }).format(value);
    } catch (err) {
        console.warn("Invalid currency code", unit, err);
        return value.toLocaleString("en-US");
    }
};


const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        alignItems: "center",
        borderBottomWidth: 1,           // bottom border
        borderBottomColor: "rgba(255,255,255,0.05)",
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
