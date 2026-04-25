import Form from "@/app/ui/interviews/add-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { InterviewJobDropdown } from "@/app/ui/dropdowns";
import { fetchJobsForDropdown } from "@/app/lib/data";
import { InterviewJob } from "@/app/lib/definitions";

export default async function Page() {
    const data = await fetchJobsForDropdown();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Interviews", href: "/dashboard/interviews" },
                    {
                        label: "Add Interview",
                        href: "/dashboard/interviews/add",
                        active: true,
                    },
                ]}
            />
            <Form>
                <InterviewJobDropdown data={data} />
            </Form>
        </main>
    )
}