import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteContact } from "@/app/lib/actions";

export function AddContact() {
    return (
        <Link
            href="/dashboard/contacts/add"
            className="flex h-10 items-center rounded-lg bg-sky-900 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-off-2 focus-visible:outline-sky-600"
        >
            <span className="hidden md:block">Add Contact</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
};

export function UpdateContact({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/contacts/${id}/edit`}
            className="rounded-md p-2 bg-sky-900 text-white hover:bg-gray-800 hover:text-blue-400"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
};

export function DeleteContact({ id }: { id: string }) {
    const deleteContactWithId = deleteContact.bind(null, id);

    return (
        <form action={deleteContactWithId}>
            <button type="submit" className="cursor-pointer rounded-md p-2 bg-red-800 text-white hover:bg-red-900">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
};