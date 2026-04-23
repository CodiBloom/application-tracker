"use client";

import { Job } from "@/app/lib/definitions";
import { BuildingOfficeIcon, ClipboardDocumentListIcon, PencilSquareIcon, WindowIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, DocumentCheckIcon, XCircleIcon, ClockIcon, UserCircleIcon, CurrencyDollarIcon, BookOpenIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateJob, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditJobForm({
    job
}: {
    job: Job;
}) {
    const updateJobWithId = updateJob.bind(null, job.id.toString());
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(updateJobWithId, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-black-50 p-4 md:p-6" aria-describedby="database-error">
                {/* Company Name */}
                <div className="mb-4">
                    <label htmlFor="company_name" className="mb-2 block text-sm font-medium">
                        Company Name
                    </label>
                    <div className="relative">
                        <input
                            id="company_name"
                            name="company_name"
                            className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                            defaultValue={job.company_name}
                            aria-describedby="company-name-error"
                        />
                        <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                    </div>
                    <div id="company-name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.company_name &&
                            state.errors.company_name.map((error:string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Job Title */}
                <div className="mb-4">
                    <label htmlFor="job_title" className="mb-2 block text-sm font-medium">
                        Job Title
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="job_title"
                                name="job_title"
                                defaultValue={job.job_title}
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="job-title-error"
                            />
                            <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="job-title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.job_title &&
                            state.errors.job_title.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Job Description */}
                <div className="mb-4">
                    <label htmlFor="job_description" className="mb-2 block text-sm font-medium">
                        Job Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="job_description"
                                name="job_description"
                                defaultValue={job.job_description}
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                rows={7}
                                aria-describedby="job-description-error"
                            />
                            <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="job-description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.job_description &&
                            state.errors.job_description.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Job URL */}
                <div className="mb-4">
                    <label htmlFor="job_url" className="mb-2 block text-sm font-medium">
                        Job URL
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="job_url"
                                name="job_url"
                                defaultValue={job.job_url}
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="job-url-error"
                            />
                            <WindowIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="job-url-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.job_url &&
                            state.errors.job_url.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Salary Minimum */}
                <div className="mb-4">
                    <label htmlFor="salary_min" className="mb-2 block text-sm font-medium">
                        Salary Minimum
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="salary_min"
                                name="salary_min"
                                defaultValue={job.salary_min?.toString()}
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="salary-min-error"
                            />
                            <ArrowTrendingDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="salary-min-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.salary_min &&
                            state.errors.salary_min.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Salary Maximum */}
                <div className="mb-4">
                    <label htmlFor="salary_max" className="mb-2 block text-sm font-medium">
                        Salary Maximum
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="salary_max"
                                name="salary_max"
                                defaultValue={job.salary_max?.toString()}
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="salary-max-error"
                            />
                            <ArrowTrendingUpIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="salary-max-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.salary_max &&
                            state.errors.salary_max.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set Application Status
                    </legend>
                    <div className="rounded-md border border-blue-300 bg-black px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="applied"
                                    name="status"
                                    type="radio"
                                    value="applied"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="applied"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Applied <DocumentCheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="rejected"
                                    name="status"
                                    type="radio"
                                    value="rejected"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="rejected"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Rejected <XCircleIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="scheduled"
                                    name="status"
                                    type="radio"
                                    value="scheduled"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="scheduled"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Scheduled <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="interviewed"
                                    name="status"
                                    type="radio"
                                    value="interviewed"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="interviewed"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Interviewed <UserCircleIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="offered"
                                    name="status"
                                    type="radio"
                                    value="offered"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="offered"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Offered <CurrencyDollarIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                        <div id="status-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.status &&
                                state.errors.status.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </fieldset>
                {/* Notes */}
                <div className="mb-4">
                    <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                        Notes
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="notes"
                                name="notes"
                                defaultValue={job.notes}
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                rows={5}
                                aria-describedby="notes-error"
                            />
                            <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="notes-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.notes &&
                            state.errors.notes.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Applied On */}
                <div className="mb-4">
                    <label htmlFor="applied_on" className="mb-2 block text-sm font-medium">
                        Enter date application was submitted (yyyy/MM/dd)
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <p
                                id="applied_on"
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                            >{job.applied_on.toString()}</p>
                            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="database-error" aria-live="polite" aria-atomic="true">
                {state.message &&
                    <p className="mt-2 text-sm text-red-500" key={state.message}>
                        {state.message}
                    </p>
                }
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/jobs"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-400"
                >
                    Cancel
                </Link>
                <Button type="submit">Add Job</Button>
            </div>
        </form>
    )
}