import { Suspense } from "react";
import { fetchApplications } from "@/app/lib/data";
import { BarChart } from "@/app/ui/dashboard/chart";

export default async function Page() {
    const data = await fetchApplications();

    return (
        <main>
            <div className="max-w-full w-full">
                <h1 className="mb-4 text-xl md:text-2xl">
                    Dashboard
                </h1>
                <BarChart data={data} />
            </div>
        </main>
    )
}