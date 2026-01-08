import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";

type Props = {
    onClose: () => void;
    symbol: string;
};

type AIResponse = {
    summary: {
        income_statement: string;
        balance_sheet: string;
        cash_flow_statement: string;
    };
};


export default function FinancialsAISummary({ onClose,symbol }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [aiSummary, setAiSummary] = useState<AIResponse | null>(null);

    const BASE_URL = "http://192.168.1.105:8085/api"; // your backend API

    // Fetch AI summary when component mounts or symbol changes
    useEffect(() => {
        if (!symbol) return;

        const fetchAISummary = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get<AIResponse>(`${BASE_URL}/stock/info/ai/financial/${symbol}`);
                setAiSummary(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch AI financial summary");
            } finally {
                setLoading(false);
            }
        };

        fetchAISummary();
    }, [symbol]);


    return (
        <View style={styles.modalOverlay}>
            <SafeAreaView edges={[]} style={styles.modalView}>
                {loading && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                )}
                {error && <Text style={styles.error}>{error}</Text>}
                {aiSummary && (
                    <View>
                <View style={styles.topRow}>
                    <Text style={styles.modalText}>AI Summary</Text>
                    <Pressable onPress={onClose}>
                        <EvilIcons name="close" size={22} />
                    </Pressable>
                </View>
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}
                    style={styles.container}>
                        <Text style={styles.modalText1}>
                            Income statement Summary
                        </Text>
                        <Text style={styles.modalTexts}>
                            {aiSummary.summary.income_statement}
                        </Text>
                        <Text style={styles.modalText1}>
                            Balance Sheet Summary
                        </Text>
                        <Text style={styles.modalTexts}>
                            {aiSummary.summary.balance_sheet}
                        </Text>
                        <Text style={styles.modalText1}>
                            Cash Flow Statement Summary
                        </Text>
                        <Text style={styles.modalTexts}>
                            {aiSummary.summary.cash_flow_statement}
                        </Text>
                    </ScrollView>
                </View>
                    </View>

                )}
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalView: {
        flex: 1,
        position: 'absolute',
        height: '50%',
        width: '100%',
        backgroundColor: 'white',
        padding: 29,

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,

    },


    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    },

    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: "700",
    },

    modalText1: {
        marginTop:9,
        marginBottom: 15,
        fontSize: 17,
        fontWeight: "700",
    },
    modalTexts: {
        fontSize: 14,
        fontWeight: 'light'
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        marginBottom: 80,
    },
    error: {
        color: 'red',
        marginTop: 20,
    },
});