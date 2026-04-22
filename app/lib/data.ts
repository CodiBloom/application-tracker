import sql from "./db";
import { Job, JobsTable } from "./definitions";


export async function fetchApplications() {
    try {
        const data = await sql<Job[]>`SELECT * FROM jobs`;
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchJobsPages(query: string | number) {
    try {

        const jobs = await sql`SELECT COUNT(*)
        FROM jobs
        WHERE
            company_name ILIKE ${`%${query}%`} OR
            job_title ILIKE ${`%${query}%`} OR
            notes ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(jobs[0].count) / ITEMS_PER_PAGE);
        return totalPages;

    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of jobs.");
    }
}

export async function fetchFilteredJobs(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const jobs = await sql<JobsTable[]>`
            SELECT *
            FROM jobs
            WHERE
                company_name ILIKE ${`%${query}%`} OR
                job_title ILIKE ${`%${query}%`} OR
                notes ILIKE ${`%${query}%`}
        `;

        return jobs;
    } catch (error) {
        console.error("Data Error:", error);
        throw new Error("Failed to fetch jobs.");
    }
}