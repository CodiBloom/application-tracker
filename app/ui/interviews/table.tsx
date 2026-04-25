import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredInterviews } from "@/app/lib/data";
import { ViewInterview, DeleteInterview } from "@/app/ui/interviews/buttons";
import InterviewStatus from "@/app/ui/interviews/status";

export default async function InterviewsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const interviews = await fetchFilteredInterviews(query, currentPage);

    return (
        <div className="mt-6 flow-root">
                    <div className="inline-block min-w-full align-middle">
                        <div className="rounded-lg bg-gray-500 outline-4 outline-gray-600 p-2 md:pt-0">
                            <div className="md:hidden">
                                {interviews?.map((interview) => (
                                    <div
                                        key={interview.id}
                                        className="mb-2 w-full rounded-md bg-gray-500 p-4"
                                    >
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div>
                                                <div className="mb-2 flex items-center">
                                                    <p>{interview.company_name}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">{interview.job_title}</p>
                                            </div>
                                            <InterviewStatus status={interview.interview_status} />
                                        </div>
                                        <div className="flex w-full items-center justify-between pt-4">
                                            <div>
                                                <p>{interview.interview_date.toDateString()}</p>
                                                <p>{interview.interview_time.toString()}</p>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <ViewInterview id={interview.id.toString()} />
                                                <DeleteInterview id={interview.id.toString()} />
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
                                            Date
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Time
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Status
                                        </th>
                                        <th scope="col" className="relative py-3 pl-6 pr-3">
                                            <span className="sr-only">View or Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-400 outline-2 outline-gray-700 rounded-md">
                                    {interviews?.map((interview) => (
                                        <tr
                                            key={interview.id}
                                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                        >
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex items-center gap-3">
                                                    <p>{interview.company_name}</p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                {interview.job_title}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                {interview.interview_date.toDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                {interview.interview_time.toString()}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                <InterviewStatus status={interview.interview_status} />
                                            </td>
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex justify-end gap-3">
                                                    <ViewInterview id={interview.id.toString()} />
                                                    <DeleteInterview id={interview.id.toString()} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
};