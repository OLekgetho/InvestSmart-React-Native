import { ResultsFinance } from "@/models/finance";

export type BalanceSheetItem = {
    key: string;
    label: string;
    value: number;
    unit: string;
};

export const normalizeBalanceSheet = (
    balanceSheet?: Record<string, ResultsFinance>
): BalanceSheetItem[] => {
    if (!balanceSheet) return [];

    return Object.entries(balanceSheet).map(([key, item]) => ({
        key,
        label: item.label,
        value: item.value,
        unit: item.unit,
    }));
};
