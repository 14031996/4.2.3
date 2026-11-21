import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "../../types/Job";
import { fetchJobs } from "../thunks/JobsThunks";

type JobsState = {
  jobs: Job[];
  isLoading: boolean;
  error: string;
  page: number;
  totalPages: number;
  requestId: string | null;
};

const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  error: "",
  page: 1,
  totalPages: 0,
  requestId: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.jobs = action.payload.jobs;
        state.totalPages = action.payload.pagination.totalPages;
        state.isLoading = false;
        state.requestId = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.isLoading = false;
        state.error = action.payload || "Не удалось загрузить вакансии";
        state.requestId = null;
      });
  },
});

export const { setPage } = jobsSlice.actions;

export default jobsSlice.reducer;
