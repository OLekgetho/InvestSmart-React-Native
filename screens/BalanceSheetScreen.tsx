import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getStockFinance } from "@/api/finance";
import { normalizeBalanceSheet, BalanceSheetItem } from "@/utils/finance";
import BalanceSheet from "@/components/BalanceSheet";

export default function BalanceSheetScreen() {
    const symbol = "AAPL"; // later this comes from router

    const [data, setData] = useState<BalanceSheetItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStockFinance(symbol)
            .then((res) => {
                const balanceSheetRaw =
                    res.results?.[0]?.financials?.balance_sheet;

                setData(normalizeBalanceSheet(balanceSheetRaw));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return <BalanceSheet data={data} />;
}
