"use client";

import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { InterviewJob } from "@/app/lib/definitions";

type JobDropdownProps = {
    data: InterviewJob[]
}

export function InterviewJobDropdown({ data }: JobDropdownProps) {
    return (
        <select
            id="job"
            name="job.id"
            className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500 md:w-1/3"
            defaultValue=""
        >
            {data &&
            data.map((job) => (
                <option key={job.id} value={job.id}>{job.company_name} {job.job_title}</option>
            ))}
        </select>
    )
}