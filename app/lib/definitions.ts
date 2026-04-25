export type Job = {
    id: number,
    company_name: string,
    job_title: string,
    job_description: string,
    job_url: string,
    salary_min: number | null,
    salary_max: number | null,
    status: "applied" | "rejected" | "scheduled" | "interviewed" | "offered",
    notes: string,
    applied_on: Date,
    last_updated: Date,
};

export type Contact = {
    id: number,
    contact_name: string,
    contact_phone: string | null,
    contact_email: string | null,
};

export type Interview = {
    id: number,
    interview_date: Date,
    interview_time: Date,
    job: number,
    contact: number,
    interview_status: "upcoming" | "past" | "cancelled",
};

export type Agency = {
    id: number,
    agency_name: string,
};

export type InterviewsTable = {
    id: number,
    interview_date: Date,
    interview_time: Date,
    interview_status: "upcoming" | "past" | "cancelled",
    company_name: string,
    job_title: string,
};

export type JobsTable = {
    id: number,
    company_name: string,
    job_title: string,
    status: "applied" | "rejected" | "scheduled" | "interviewed" | "offered",
    applied_on: Date,
    last_updated: Date,
};

export type InterviewJob = {
    id: number,
    company_name: string,
    job_title: string,
};