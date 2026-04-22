"use client";

import dynamic from "next/dynamic";
import "chart.js/auto";
import { Job } from "@/app/lib/definitions";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
    ssr: false,
});

type ChartProps = {
    data: Job[]
}

export function BarChart({ data }: ChartProps) {

    const status = {
        "applied": 0,
        "rejected": 0,
        "scheduled": 0,
        "interviewed": 0,
        "offered": 0,
    };

    data.forEach(job => {
        if (Object.hasOwn(status, job.status)) {
            status[job.status]++;
        }
    });

    const chartData = {
        labels: Object.keys(status),
        datasets: [
            {
                label: "Application Status",
                data: Object.values(status),
                backgroundColor: [
                    "rgba(255,99,132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="mt-[20px] w-full">
            <Bar data={chartData} />
        </div>
    )

}