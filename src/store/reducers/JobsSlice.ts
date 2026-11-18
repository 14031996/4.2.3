import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "../../types/Job";
import { fetchJobs } from "../thunks/JobsThunks";

type JobsState = {
  jobs: Job[];
  isLoading: boolean;
  error: string;
  search: string;
  city: string;
  skills: string[];
  page: number;
  totalPages: number;
  requestId: string | null;
};

const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  error: "",
  search: "",
  city: "",
  skills: ["JavaScript", "React", "Redux", "Python"],
  page: 1,
  totalPages: 0,
  requestId: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },

    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      state.page = 1;
    },

    addSkill: (state, action: PayloadAction<string>) => {
      const skill = action.payload.trim();

      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill);
        state.page = 1;
      }
    },

    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
      state.page = 1;
    },

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

export const { setSearch, setCity, addSkill, removeSkill, setPage } =
  jobsSlice.actions;

export default jobsSlice.reducer;
