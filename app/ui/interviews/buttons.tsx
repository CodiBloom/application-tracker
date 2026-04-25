import { EyeIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteInterview } from "@/app/lib/actions";

export function AddInterview() {
    return (
        <Link
            href="/dashboard/interviews/add"
            className="flex h-10 items-center rounded-lg bg-sky-900 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-off-2 focus-visible:outline-sky-600"
        >
            <span className="hidden md:block">Add Interview</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
};

export function ViewInterview({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/interviews/${id}/view`}
            className="rounded-md p-2 bg-sky-900 text-white hover:bg-gray-800 hover:text-blue-400"
        >
            <EyeIcon className="w-5" />
        </Link>
    );
};

export function DeleteInterview({ id }: { id: string }) {
    const deleteInterviewWithId = deleteInterview.bind(null, id);

    return (
        <form action={deleteInterviewWithId}>
            <button type="submit" className="cursor-pointer rounded-md p-2 bg-red-800 text-white hover:bg-red-900">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
};