import Form from "@/app/ui/contacts/add-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Contacts", href: "/dashboard/contacts" },
                    {
                        label: "Add Contact",
                        href: "/dashboard/contacts/add",
                        active: true
                    },
                ]}
            />
            <Form />
        </main>
    )
}