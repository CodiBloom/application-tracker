"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sql from "@/app/lib/db";

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