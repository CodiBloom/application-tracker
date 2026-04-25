import Form from "@/app/ui/jobs/add-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Jobs", href: "/dashboard/jobs" },
                    {
                        label: "Add Job",
                        href: "/dashboard/jobs/add",
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}