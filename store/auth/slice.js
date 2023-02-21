import { createSlice } from "@reduxjs/toolkit";

import { login } from "./thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    access_token: null,
    refresh_token: null,
    id_token: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },

    [login.fulfilled]: (state, { payload }) => {
      state.access_token = payload.response.AuthenticationResult.AccessToken;
      state.refresh_token = payload.response.AuthenticationResult.RefreshToken;
      state.id_token = payload.response.AuthenticationResult.IdToken;

      state.isLoading = false;
      state.isAuthenticated = true;
    },

    [login.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
