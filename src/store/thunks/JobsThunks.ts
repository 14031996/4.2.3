import { createAsyncThunk } from "@reduxjs/toolkit";
import type { JobsResponse } from "../../types/Job";

type JobsParams = {
  search: string;
  city: string;
  skills: string[];
  page: number;
};

export const fetchJobs = createAsyncThunk<
  JobsResponse,
  JobsParams,
  { rejectValue: string }
>(
  "jobs/fetchJobs",
  async ({ search, city, skills, page }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        search,
        city,
        skills: skills.join(","),
        page: String(page),
        limit: "10",
      });

      const response = await fetch(
        `https://kata-jobs.onrender.com/api/jobs?${params}`,
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить вакансии");
      }

      const data: JobsResponse = await response.json();

      return data;
    } catch {
      return rejectWithValue("Не удалось загрузить вакансии");
    }
  },
);
