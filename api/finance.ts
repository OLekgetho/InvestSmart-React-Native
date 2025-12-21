import axios from "axios";
import { StockFinanceResponse } from "@/models/finance";

const API_BASE_URL = "http://192.168.1.105:8085/api"; // change this

export const getStockFinance = async (symbol: string) => {
    const response = await axios.get<StockFinanceResponse>(
        `${API_BASE_URL}/profile/finance/${symbol}`
    );
    console.log(response.data)
    return response.data;
};
