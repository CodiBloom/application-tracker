import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function InterviewStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full px-2 py-1 text-xs",
                {
                    "bg-blue-100 text-blue-500": status === "upcoming",
                    "bg-green-100 text-green-500": status === "past",
                    "bg-red-100 text-red-500": status === "cancelled",
                },
            )}
        >
            {status === "upcoming" ? (
                <>
                    Upcoming
                    <ClockIcon className="ml-1 w-4 text-blue" />
                </>
            ) : null}
            { status === "past" ? (
                <>
                    Past
                    <CheckCircleIcon className="ml-1 w-4 text-green" />
                </>
            ) : null}
            { status === "cancelled" ? (
                <>
                    Cancelled
                    <XCircleIcon className="ml-1 w-4 text-red" />
                </>
            ) : null}
        </span>
    );
}