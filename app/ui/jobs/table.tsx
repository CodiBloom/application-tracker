import { UpdateJob } from "@/app/ui/jobs/buttons";
import JobStatus from "@/app/ui/jobs/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredJobs } from "@/app/lib/data";

export default async function JobsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const jobs = await fetchFilteredJobs(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-500 outline-4 outline-gray-600 p-2 md:pt-0">
                    <div className="md:hidden">
                        {jobs?.map((job) => (
                            <div
                                key={job.id}
                                className="mb-2 w-full rounded-md bg-gray-500 p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{job.company_name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{job.job_title}</p>
                                    </div>
                                    <JobStatus status={job.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p>{formatDateToLocal(job.applied_on.toString())}</p>
                                        <p>{formatDateToLocal(job.last_updated.toString())}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateJob id={job.id.toString()} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-mdeium sm:pl-6">
                                    Company
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Position
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Applied On
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Last Updated
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-400 outline-2 outline-gray-700 rounded-md">
                            {jobs?.map((job) => (
                                <tr
                                    key={job.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>{job.company_name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {job.job_title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(job.applied_on.toString())}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(job.last_updated.toString())}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <JobStatus status={job.status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateJob id={job.id.toString()} />
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