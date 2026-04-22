import { DocumentCheckIcon, XCircleIcon, ClockIcon, UserCircleIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function JobStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full px-2 py-1 text-xs",
                {
                    "bg-gray-100 text-gray-500": status === "applied",
                    "bg-red-100 text-red-500": status === "rejected",
                    "bg-blue-100 text-blue-500": status === "scheduled",
                    "bg-yellow-100 text-yellow-500": status === "interviewed",
                    "bg-green-100 text-green-500": status === "offered",
                },
            )}
        >
            {status === "applied" ? (
                <>
                    Applied
                    <DocumentCheckIcon className="ml-1 w-4 text-gray-500" />
                </>
            ) : null}
            {status === "rejected" ? (
                <>
                    Rejected
                    <XCircleIcon className="ml-1 w-4 text-red" />
                </>
            ) : null}
            {status === "scheduled" ? (
                <>
                    Scheduled
                    <ClockIcon className="ml-1 w-4 text-blue" />
                </>
            ) : null}
            {status === "interviewed" ? (
                <>
                    Interviewed
                    <UserCircleIcon className="ml-1 w-4 text-yellow" />
                </>
            ) : null}
            {status === "offered" ? (
                <>
                    Offered
                    <CurrencyDollarIcon className="ml-1 w-4 text-green" />
                </>
            ) : null}
        </span>
    );
}