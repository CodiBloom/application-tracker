import Form from "@/app/ui/jobs/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchJobById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Job } from "@/app/lib/definitions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id
    const job = await fetchJobById(id);

    if (!job) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Jobs", href: "/dashboard/jobs" },
                    {
                        label: "Edit Job",
                        href: `dashboard/jobs/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form job={job} />
        </main>
    )
}