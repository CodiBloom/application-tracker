"use client";

import Link from "next/link";
import { UserIcon, PhoneIcon, AtSymbolIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { addContact, ContactState } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form() {
    const initialState: ContactState = { message: null, errors: {} };
    const [state, formAction] = useActionState(addContact, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-black-50 p-4 md:p-6" aria-describedby="database-error">
                {/* Contact Name */}
                <div className="mb-4">
                    <label htmlFor="contact_name" className="mb-2 block text-sm font-medium">
                        Contact Name
                    </label>
                    <div className="relative">
                        <input
                            id="contact_name"
                            name="contact_name"
                            className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                            placeholder="..."
                            aria-describedby="contact_name-error"
                        />
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                    </div>
                    <div id="company-name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.contact_name &&
                            state.errors.contact_name.map((error:string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="contact_phone" className="mb-2 block text-sm font-medium">
                        Phone Number
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="contact_phone"
                                name="contact_phone"
                                placeholder="..."
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                aria-describedby="contact_phone-error"
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="job-title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.contact_phone &&
                            state.errors.contact_phone.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* Email Address */}
                <div className="mb-4">
                    <label htmlFor="contact_email" className="mb-2 block text-sm font-medium">
                        Email Address
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="contact_email"
                                name="contact_email"
                                placeholder="..."
                                className="peer block w-full rounded-md border border-blue-300 py-2 pl-10 text-sm placeholder:text-gray-500"
                                rows={7}
                                aria-describedby="contact_email-error"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-300" />
                        </div>
                    </div>
                    <div id="job-description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.contact_email &&
                            state.errors.contact_email.map((error: string) => (
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
                    href="/dashboard/contacts"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-400"
                >
                    Cancel
                </Link>
                <Button type="submit">Add Job</Button>
            </div>
        </form>
    )
}