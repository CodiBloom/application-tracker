export type Job = {
    id: number,
    company_name: string,
    job_title: string,
    job_description: string,
    job_url: string,
    salary_min: number | null,
    salary_max: number | null,
    status: "applied" | "rejected" | "scheduled" | "interviewed" | "offered" | null,
    applied_on: Date,
    last_updated: Date,
}

export type Contact = {
    id: number,
    contact_name: string,
    contact_phone: string | null,
    contact_email: string | null,
}

export type Interview = {
    id: number,
    interview_date: Date,
    interview_time: Date,
    job: number,
    contact: number,
    interview_status: "upcoming" | "past" | null,
}

export type Agency = {
    id: number,
    agency_name: string,
}

export type JobsTable = {
    id: number,
    company_name: string,
    job_title: string,
    job_description: string,
    job_url: string,
    salary_min: number,
    salary_max: number,
    status: "applied" | "rejected" | "scheduled" | "interviewed" | "offered" | null,
    notes: string,
    applied_on: Date,
    last_updated: Date,
}