"use client";

import { createContext, useContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChartContext = createContext<Promise<any> | null>(null);

export function ChartProvider({
    children, chartPromise,
} : {
    children: React.ReactNode
    chartPromise: Promise<any>
}) {
    return (
        <ChartContext.Provider value={chartPromise}>{children}</ChartContext.Provider>
    );
}

export function useChartContext() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useChartContext must be used within a ChartProvider");
    }
    return context;
}