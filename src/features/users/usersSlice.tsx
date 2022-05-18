import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const fetchUsers: any = createAsyncThunk(
  'fetchUsers',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (data) => data.json()
  )
  return res
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      userAdded(state: any, action) {
        state.data.push(action.payload);
      },
      userUpdated(state, action) {
        const { id, name, email } = action.payload;
        const existingUser: any = state.data.find((user: any) => user.id === id);
        if (existingUser) {
          existingUser.name = name;
          existingUser.email = email;
        }
      },
    },
    extraReducers: {
      [fetchUsers.pending]: (state) => {
        state.loading = true
      },
      [fetchUsers.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.data = state.data.concat(payload)
      },
      [fetchUsers.rejected]: (state) => {
        state.loading = false
      },
    },
  });

export const { userAdded, userUpdated } = usersSlice.actions;
export default usersSlice.reducer;