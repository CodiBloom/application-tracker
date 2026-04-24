import { UpdateContact, DeleteContact } from "@/app/ui/contacts/buttons";
import { fetchFilteredContacts } from "@/app/lib/data";

export default async function ContactsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const contacts = await fetchFilteredContacts(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-500 outline-4 outline-gray-600 p-2 md:pt-0">
                    <div className="md:hidden">
                        {contacts?.map((contact) => (
                            <div
                                key={contact.id}
                                className="mb-2 w-full rounded-md bg-gray-500 p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{contact.contact_name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p>{contact.contact_phone}</p>
                                        <p>{contact.contact_email}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateContact id={contact.id.toString()} />
                                        <DeleteContact id={contact.id.toString()} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Phone
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-400 outline-2 outline-gray-700 rounded-md">
                            {contacts?.map((contact) => (
                                <tr
                                    key={contact.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>{contact.contact_name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {contact.contact_phone}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {contact.contact_email}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateContact id={contact.id.toString()} />
                                            <DeleteContact id={contact.id.toString()} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}