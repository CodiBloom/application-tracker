"use client";

import Link from "next/link";
import { ClockIcon, CheckCircleIcon, XCircleIcon, BookOpenIcon, CalendarDaysIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { addInterview, InterviewState } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form({ children } : { children: React.ReactNode }) {
    const initialState: InterviewState = { message: null, errors: {} };
    const [state, formAction] = useActionState(addInterview, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-black-50 p-4" aria-describedby="database-error">
                {/* Job Dropdown */}
                <div className="mb-4">
                    <label htmlFor="job" className="mb-2 block text-sm font-medium">
                        Select Job
                    </label>
                    <div className="relative">
                        {children}
                        <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                    </div>
                </div>
                {/* Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set Interview Status
                    </legend>
                    <div className="rounded-md border border-blue-300 bg-black px-[14px] py-3 md:w-1/3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="upcoming"
                                    name="interview_status"
                                    type="radio"
                                    value="upcoming"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="upcoming"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Upcoming <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="past"
                                    name="interview_status"
                                    type="radio"
                                    value="past"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="past"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Past <CheckCircleIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="cancelled"
                                    name="interview_status"
                                    type="radio"
                                    value="cancelled"
                                    className="h-4 w-4 cursor-pointer border-blue-300 bg-black-100 text-gray-600"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="cancelled"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-300 px-3 py-1.5 text-xs font-medium text-gray-800"
                                >
                                    Cancelled <XCircleIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                        <div id="status-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.interview_status &&
                                state.errors.interview_status.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </fieldset>
                {/* Interview Date */}
                <div className="mb-4">
                    <label htmlFor="interview_date" className="mb-2 block text-sm font-medium">
                        Enter date of interview (yyyy/MM/dd)
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="interview_date"
                                name="interview_date"
                                placeholder="..."
                                className="peer block w-full md:w-1/3 rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="interview-date-error"
                            />
                            <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="applied-on-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.interview_date &&
                            state.errors.interview_date.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Interview Time */}
                <div className="mb-4">
                    <label htmlFor="interview_time" className="mb-2 block text-sm font-medium">
                        Enter time of interview (HH:mm)
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="interview_time"
                                name="interview_time"
                                placeholder="..."
                                className="peer block w-full md:w-1/3 rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="interview-time-error"
                            />
                            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="applied-on-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.interview_time &&
                            state.errors.interview_time.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
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
                                placeholder="..."
                                className="peer block w-full md:w-1/2 rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
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
                    href="/dashboard/interviews"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-400"
                >
                    Cancel
                </Link>
                <Button type="submit">Add Interview</Button>
            </div>
        </form>
    )
}