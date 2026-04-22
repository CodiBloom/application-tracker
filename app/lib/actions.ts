"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sql from "@/app/lib/db";

const FormSchema = z.object({
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

const AddJob = FormSchema.omit({ id: true, last_updated: true });
const UpdateJob = FormSchema.omit({ id: true, applied_on: true, last_updated: true });

export type State = {
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

export async function addJob(prevState: State, formData: FormData) {
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
    const applied_on_final = new Date(Number(appliedOnArr[0]), Number(appliedOnArr[1]), Number(appliedOnArr[2])).toISOString().split("T")[0];
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
}

export async function updateJob(id: string, prevState: State, formData: FormData) {
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
}

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
}