import sql from "./db";
import { Job, Contact } from "./definitions";

const JOBS_ITEMS_PER_PAGE = 6;
const CONTACTS_ITEMS_PER_PAGE=10;

export async function fetchApplications() {
    try {
        const data = await sql<Job[]>`SELECT * FROM jobs`;
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
};

export async function fetchJobsPages(query: string | number) {
    try {
        const jobs = await sql`SELECT COUNT(*)
        FROM jobs
        WHERE
            company_name ILIKE ${`%${query}%`} OR
            job_title ILIKE ${`%${query}%`} OR
            notes ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(jobs[0].count) / JOBS_ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of jobs.");
    }
};

export async function fetchFilteredJobs(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * JOBS_ITEMS_PER_PAGE;

    try {
        const jobs = await sql<Job[]>`
            SELECT *
            FROM jobs
            WHERE
                company_name ILIKE ${`%${query}%`} OR
                job_title ILIKE ${`%${query}%`} OR
                notes ILIKE ${`%${query}%`}
            ORDER BY last_updated DESC
            LIMIT ${JOBS_ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return jobs;
    } catch (error) {
        console.error("Data Error:", error);
        throw new Error("Failed to fetch jobs.");
    }
};

export async function fetchJobById(id: string) {
    try {
        const job = await sql<Job[]>`
            SELECT *
            FROM jobs
            WHERE id = ${id}
        `
        return job[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch job.");
    }
};

export async function fetchFilteredContacts(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * CONTACTS_ITEMS_PER_PAGE;

    try {
        const contacts = await sql<Contact[]>`
            SELECT *
            FROM contacts
            WHERE
                contact_name ILIKE ${`%${query}%`} OR
                contact_email ILIKE ${`%${query}%`}
            LIMIT ${CONTACTS_ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return contacts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch contacts.");
    }
};

export async function fetchContactsPages(query: string | number) {
    try {
        const jobs = await sql`SELECT COUNT(*)
        FROM contacts
        WHERE
            contact_name ILIKE ${`%${query}%`} OR
            contact_email ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(jobs[0].count) / JOBS_ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of jobs.");
    }
};