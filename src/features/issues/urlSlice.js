import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchIssues } from "./issuesSlice";

const initialState = {
  url: "",
};

export const test = createAsyncThunk("url/test", fetchIssues);

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(test.fulfilled, (state, action) => {
      console.log("helloww");
    }),
});

export default urlSlice.reducer;
