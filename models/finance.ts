export type ResultsFinance = {
    label: string;
    value: number;
    unit: string;
};

export type Financials = {
    balance_sheet?: Record<string, ResultsFinance>;
    income_statement?: Record<string, ResultsFinance>;
    cash_flow_statement?: Record<string, ResultsFinance>;
};

export type StockFinanceResult = {
    financials: Financials;
};

export type StockFinanceResponse = {
    results: StockFinanceResult[];
};
