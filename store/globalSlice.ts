"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  websiteLang: "en",
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setWebsiteLang: (state, action) => {
      state.websiteLang = action.payload;
    },
  },
});

export default globalSlice.reducer;
export const { setWebsiteLang } = globalSlice.actions;
