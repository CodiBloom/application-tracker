"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sql from "@/app/lib/db";

// ------------- JOB ACTIONS -------------------

const JobFormSchema = z.object({
    id: z.string(),
    company_name: z.string().min(1, { message: "Please enter a company name." }),
    job_title: z.string().min(1, { message: "Please enter a job title." }),
    job_description: z.string().min(1, { message: "Please enter a job description." }),
    job_url: z.url({ error: "Please enter a valid URL." }),
    salary_min: z.coerce.number(),
    salary_max: z.coerce.number(),
    status: z.enum(["applied", "rejected", "scheduled", "interviewed", "offered"], { error: "Please select a status." }),
    notes: z.string(),
    applied_on: z.string().min(1, { message: "Please enter a date." }),
    last_updated: z.date(),
});

const AddJob = JobFormSchema.omit({ id: true, last_updated: true });
const UpdateJob = JobFormSchema.omit({ id: true, applied_on: true, last_updated: true });

export type JobState = {
    errors?: {
        company_name?: string;
        job_title?: string;
        job_description?: string;
        job_url?: string;
        salary_min?: number;
        salary_max?: number;
        status?: string;
        notes?: string;
        applied_on?: Date;
    };
    message?: string | null;
};

export async function addJob(prevState: JobState, formData: FormData) {
    const validatedFields = AddJob.safeParse({
        company_name: formData.get("company_name"),
        job_title: formData.get("job_title"),
        job_description: formData.get("job_description"),
        job_url: formData.get("job_url"),
        salary_min: formData.get("salary_min"),
        salary_max: formData.get("salary_max"),
        status: formData.get("status"),
        notes: formData.get("notes"),
        applied_on: formData.get("applied_on"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Add Job.",
        };
    }

    const {
        company_name,
        job_title,
        job_description,
        job_url,
        salary_min,
        salary_max,
        status,
        notes,
        applied_on,
    } = validatedFields.data;
    const appliedOnArr = applied_on.split("/");
    const applied_on_final = new Date(Number(appliedOnArr[0]), Number(appliedOnArr[1]) - 1, Number(appliedOnArr[2])).toISOString().split("T")[0];
    const last_updated = new Date().toISOString();

    try {
        await sql`
            INSERT INTO jobs (company_name, job_title, job_description, job_url, salary_min, salary_max, status, notes, applied_on, last_updated)
            VALUES(${company_name}, ${job_title}, ${job_description}, ${job_url}, ${salary_min}, ${salary_max}, ${status}, ${notes}, ${applied_on_final}, ${last_updated})
        `;
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: "Database Error: Failed to Add Job.",
        };
    }

    revalidatePath("/dashboard/jobs");
    redirect("/dashboard/jobs");
};

export async function updateJob(id: string, prevState: JobState, formData: FormData) {
    const validatedFields = UpdateJob.safeParse({
        company_name: formData.get("company_name"),
        job_title: formData.get("job_title"),
        job_description: formData.get("job_description"),
        job_url: formData.get("job_url"),
        salary_min: formData.get("salary_min"),
        salary_max: formData.get("salary_max"),
        status: formData.get("status"),
        notes: formData.get("notes"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Job.",
        };
    }

    const {
        company_name,
        job_title,
        job_description,
        job_url,
        salary_min,
        salary_max,
        status,
        notes,
    } = validatedFields.data;
    const last_updated = new Date().toISOString().split("T")[0];

    try {
        await sql`
            UPDATE jobs
            SET company_name=${company_name}, job_title=${job_title}, job_description=${job_description}, job_url=${job_url}, salary_min=${salary_min}, salary_max=${salary_max}, status=${status}, notes=${notes}, last_updated=CURRENT_TIMESTAMP
            WHERE id=${id}
        `;
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: "Database Error: Failed to Update Job.",
        };
    }

    revalidatePath("/dashboard/jobs");
    redirect("/dashboard/jobs");
};

export async function deleteJob (id: string, formData: FormData) {
    try {
        await sql`DELETE FROM jobs WHERE id = ${id}`;
    } catch (error) {
        console.error(error);
        return {
            message: "Database Error: Failed to delete job.",
        };
    }
    revalidatePath("/dashboard/jobs");
};

// ------------- CONTACT ACTIONS -------------------

const ContactFormSchema = z.object({
    id: z.string(),
    contact_name: z.string().min(1, { message: "Please enter a contact name." }),
    contact_phone: z.string(),
    contact_email: z.string()
});

const AddContact = ContactFormSchema.omit({ id: true });
const UpdateContact = ContactFormSchema.omit({ id: true });

export type ContactState = {
    errors?: {
        contact_name?: string;
        contact_phone?: string;
        contact_email?: string;
    };
    message?: string | null;
};

export async function addContact(prevState: ContactState, formData: FormData) {
    const validatedFields = AddContact.safeParse({
        contact_name: formData.get("contact_name"),
        contact_phone: formData.get("contact_phone"),
        contact_email: formData.get("contact_email")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Add Contact.",
        };
    }

    const {
        contact_name,
        contact_phone,
        contact_email,
    } = validatedFields.data;

    try {
        await sql`
            INSERT INTO contacts (contact_name, contact_phone, contact_email)
            VALUES(${contact_name}, ${contact_phone}, ${contact_email})
        `;
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: "Database Error: Failed to Add Contact.",
        };
    }

    revalidatePath("/dashboard/contacts");
    redirect("/dashboard/contacts");
};

export async function updateContact(id: string, prevState: ContactState, formData: FormData) {
    const validatedFields = UpdateContact.safeParse({
        contact_name: formData.get("contact_name"),
        contact_phone: formData.get("contact_phone"),
        contact_email: formData.get("contact_email")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Contact.",
        };
    }

    const {
        contact_name,
        contact_phone,
        contact_email,
    } = validatedFields.data;

    try {
        await sql`
            UPDATE contacts
            SET contact_name=${contact_name}, contact_phone=${contact_phone}, contact_email=${contact_email}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: "Database Error: Failed to Update Contact.",
        };
    }

    revalidatePath("/dashboard/contacts");
    redirect("/dashboard/contacts");
};

export async function deleteContact (id: string, formData: FormData) {
    try {
        await sql`DELETE FROM contacts WHERE id = ${id}`;
    } catch (error) {
        console.error(error)
        return {
            message: "Database Error: Failed to delete contact.",
        };
    }
    revalidatePath("/dashboard/contacts");
};

// ------------- INTERVIEW ACTIONS -------------------

const InterviewFormSchema = z.object({
    id: z.string(),
    interview_date: z.string().min(1, { message: "Please enter a date." }),
    interview_time: z.string().min(1, { message: "Please enter a time." }),
    job: z.coerce.number(),
    interview_status: z.enum(["upcoming", "past", "cancelled"], { error: "Please select a status" }),
    notes: z.string(),
});

const AddInterview = InterviewFormSchema.omit({ id: true });
// const UpdateInterview = ContactFormSchema.omit({ id: true });

export type InterviewState = {
    errors?: {
        interview_date?: string;
        interview_time?: string,
        job?: number;
        interview_status?: string;
    };
    message?: string | null;
};

export async function addInterview(prevState: InterviewState, formData: FormData) {
    console.log(formData);
    const validatedFields = AddInterview.safeParse({
        interview_date: formData.get("interview_date"),
        interview_time: formData.get("interview_time"),
        job: formData.get("job.id"),
        interview_status: formData.get("interview_status"),
        notes: formData.get("notes"),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Add Interview.",
        };
    }

    const {
        interview_date,
        interview_time,
        job,
        interview_status,
        notes,
    } = validatedFields.data;
    const dateArr = interview_date.split("/");
    const timeArr = interview_time.split(":");
    const tempDate = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), Number(timeArr[0]), Number(timeArr[1]));
    const interview_date_final = tempDate.toISOString().split("T")[0];
    const interview_time_final = tempDate.toISOString().split("T")[1];


    try {
        await sql`
            INSERT INTO interviews (interview_date, interview_time, job, interview_status, notes)
            VALUES(${interview_date_final}, ${interview_time_final}, ${job}, ${interview_status}, ${notes})
        `;
    } catch (error) {
        console.error("Database Error:", error);
        return {
            message: "Database Error: Failed to Add Interview.",
        };
    }

    revalidatePath("/dashboard/interviews");
    redirect("/dashboard/interviews");
};

export async function deleteInterview (id: string, formData: FormData) {
    try {
        await sql`DELETE FROM interviews WHERE id = ${id}`;
    } catch (error) {
        console.error(error)
        return {
            message: "Database Error: Failed to delete interview.",
        };
    }
    revalidatePath("/dashboard/interviews");
};