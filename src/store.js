import { configureStore } from "@reduxjs/toolkit";
import issuesSlice from "./features/issues/issuesSlice";

const store = configureStore({
  reducer: {
    issues: issuesSlice,
  },
});

export default store;
