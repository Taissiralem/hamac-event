import { createSlice } from "@reduxjs/toolkit";

export const chosenSortieSlice = createSlice({
  name: "chosenSortie",
  initialState: {
    id: null,
  },
  reducers: {
    chooseSortie: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { chooseSortie } = chosenSortieSlice.actions;

export const selectChosenSortie = (state) => state.chosenSortie.id;

export default chosenSortieSlice.reducer;
