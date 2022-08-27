import { createSlice } from "@reduxjs/toolkit";

export const photosSlice = createSlice({
  name: "photos",
  initialState: {
    data: [],
  },
  reducers: {
    addValues: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    increaseLike: (state, action) => {
      let detailPhoto = state.data.find((item) => item.id === action.payload);
      detailPhoto.likes += 1;
      detailPhoto.liked_by_user = !detailPhoto.liked_by_user;
    },
    decreaseLike: (state, action) => {
      let detailPhoto = state.data.find((item) => item.id === action.payload);
      detailPhoto.likes -= 1;
      detailPhoto.liked_by_user = !detailPhoto.liked_by_user;
    },
  },
});

export const { addValues, increaseLike, decreaseLike } = photosSlice.actions;

export default photosSlice.reducer;
