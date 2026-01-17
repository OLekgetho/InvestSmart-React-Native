import { useEffect, useState } from "react";
import {View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView} from "react-native";
import axios from "axios";
import Colors from "@/Colors";
import Baseapi from "@/api/Baseapi";

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

interface BalanceSheetProps {
    symbol: string; // passed from parent.tsx
}

type BalanceSheetResponse = {
    [date: string]: {
        [metric: string]: number | string;
    };
};

type Props = {
    balanceSheet: Record<string, { label: string; value: number; unit: string }>;
};

export default function BalanceSheet({ symbol }: BalanceSheetProps) {
    const [data, setData] = useState<BalanceSheetResponse>({});
    const [loading, setLoading] = useState(true);

    const formatValue = (value: number | string | undefined) => {
        if (value === undefined || value === null) return "-";

        if (typeof value === "number") {
            return value.toLocaleString("en-US");
        }

        if (value === "---") {
            return "-";
        }

        return value;
    };


    useEffect(() => {
        fetch(
            `${Baseapi.API_BASE_URL}/stock/info/profile/balance/${symbol}`
        )
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [symbol]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    const dates = Object.keys(data); // top headers
    // const metrics = Array.from(
    //     new Set(
    //         dates.flatMap((date) => Object.keys(data[date]))
    //     )
    // );

    const metrics = Array.from(
        new Set(
            dates.flatMap((date) => Object.keys(data[date]))
        )
    ).sort((a, b) => a.localeCompare(b));

    return (
        <View>
            <Text className="text-white text-2xl font-light border-b">Balance Sheet</Text>
            <ScrollView horizontal>
                <View>
                    <View style={styles.row}>
                        <View style={styles.metricCell} />
                        {dates.map((date) => (
                            <View key={date} style={styles.headerCell}>
                                <Text style={styles.headerText}>
                                    {date.substring(0, 10)}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <ScrollView>
                        {metrics.map((metric) => (
                            <View key={metric} style={styles.row}>
                                <View style={styles.metricCell}>
                                    <Text style={styles.metricText}>{metric}</Text>
                                </View>

                                {dates.map((date) => (
                                    <View key={date} style={styles.dataCell}>
                                        <Text style={styles.dataText}>
                                            {formatValue(data[date][metric])}
                                        </Text>

                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
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
    metricCell: {
        width: 170,
        padding: 7,
        backgroundColor: Colors.grey,
        borderRightWidth: 1,
        borderColor: "#505050",
        borderBottomWidth: 1,
    },
    headerCell: {
        width: 140,
        padding: 8,
        backgroundColor: Colors.grey,
        alignItems: "center",
    },
    headerText: {
        fontWeight: "bold",
        color: "#ffffff"
    },
    metricText: {
        fontWeight: "600",
        color: "#ffffff"
    },
    dataCell: {
        width: 140,
        padding: 8,
        alignItems: "center",
        borderRightWidth: 1,
        borderColor: "#505050",
        borderBottomWidth: 1,
    },
    dataText: {
        fontSize: 14,
        color: "#ffffff"
    },
});
