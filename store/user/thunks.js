import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const response = await axios.get("/api/user");
  return response.data;
});
