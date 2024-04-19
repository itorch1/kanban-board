import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIssues, getRepoStars } from "../../services/apiGithub";
import toast from "react-hot-toast";

const initialState = {
  todos: [],
  assigned: [],
  closed: [],
  url: "",
  stars: 0,
  status: "idle",
  isLoadingRepoData: false,
};

function getListType(list, state) {
  return list === "todos"
    ? state.todos
    : list === "assigned"
    ? state.assigned
    : state.closed;
}

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (url) => {
    // Get url upon success to save it
    const data = await getIssues(url);
    const stars = await getRepoStars(url);
    return { data, urlData: { url, stars } };
  }
);

export const fetchRepoData = createAsyncThunk(
  "issues/fetchRepoData",
  async (url) => {
    const stars = await getRepoStars(url);
    return { url, stars };
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setData(state, action) {
      state.todos = action.payload.todos;
      state.assigned = action.payload.assigned;
      state.closed = action.payload.closed;
    },
    dropIssue: {
      prepare(draggedIssue, dragOverIssue, draggedList, dragOverList) {
        return {
          payload: { draggedIssue, dragOverIssue, draggedList, dragOverList },
        };
      },
      reducer(state, action) {
        // Determine actions based on what lists are in question
        const index1 = action.payload.draggedIssue.current;
        const index2 = action.payload.dragOverIssue.current;
        const listDrag = action.payload.draggedList.current;
        const listOver = action.payload.dragOverList.current;

        const list = getListType(listDrag, state);

        // If lists are same, swap issues
        if (listDrag === listOver) {
          const temp = list[index1];
          list[index1] = list[index2];
          list[index2] = temp;
        }
        // If lists are different, remove issue and place onto different list
        else if (listOver !== null) {
          const list2 = getListType(listOver, state);
          list2.push(list[index1]);
          list.splice(index1, 1);
        }
      },
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchIssues.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        // Model data to our needs
        const issues = action.payload.data.map((issue) => ({
          title: issue.title,
          comments: issue.comments,
          created_at: issue.created_at,
          id: issue.id,
          user: issue.user.login,
          assigned: issue.assignee !== null || issue.assignees.length > 0,
          state: issue.state,
        }));

        // Filter issues by categories
        state.todos = issues.filter(
          (issue) => issue.state === "open" && !issue.assigned
        );
        state.assigned = issues.filter(
          (issue) => issue.state === "open" && issue.assigned
        );
        state.closed = issues.filter((issue) => issue.state === "closed");

        // Set url and stars
        state.url = action.payload.urlData.url;
        state.stars = action.payload.urlData.stars;

        // Set state to idle and display success toast
        state.status = "idle";
        toast.success("Data successfully loaded");
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message);
      })
      .addCase(fetchRepoData.pending, (state, action) => {
        state.isLoadingRepoData = true;
      })
      .addCase(fetchRepoData.fulfilled, (state, action) => {
        state.stars = action.payload.stars;
        state.url = action.payload.url;
        state.isLoadingRepoData = false;
      })
      .addCase(fetchRepoData.rejected, (state, action) => {
        state.isLoadingRepoData = false;
        toast.error(action.error.message);
      }),
});

export const { dropIssue, setData } = issuesSlice.actions;
export default issuesSlice.reducer;

export const getStatus = (state) => state.issues.status;

export const getTodos = (state) => state.issues.todos;
export const getAssigned = (state) => state.issues.assigned;
export const getClosed = (state) => state.issues.closed;

export const getUrl = (state) => state.issues.url;
export const getStars = (state) => state.issues.stars;
export const getIsLoadingRepoData = (state) => state.issues.isLoadingRepoData;
