import { createSlice } from "@reduxjs/toolkit";

import { fetchUser } from "./thunks";

import { splitLastOccurrence } from "../../utils";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchUser.rejected]: (state, payload) => {
      state.isLoading = false;

      state.error = payload.error;
    },

    [fetchUser.fulfilled]: (state, { payload }) => {
      state.username = payload.data.Username;

      const fullName = payload.data.UserAttributes.filter(
        (x) => x.Name === "name"
      )[0].Value;
      const [firstName, lastName] = splitLastOccurrence(fullName, " ");

      state.firstName = firstName;
      state.lastName = lastName;

      state.email = payload.data.UserAttributes.filter(
        (x) => x.Name === "email"
      )[0].Value;

      state.username = payload.data.Username;

      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
