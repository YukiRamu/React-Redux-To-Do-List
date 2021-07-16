/* Slice.jsx handles filtering configuration on Redux */
import { createSlice } from '@reduxjs/toolkit';

const FilterSlice = createSlice({
  name: "filter",
  initialState: "all", //all, inProgress, or complete
  reducers: {
    //define action methods -- needs to return
    changeFilter: (state, action) => {
      console.log(action.payload);
      return action.payload;
    }
  }
});

//export reducer, actions,and state(selector)
export default FilterSlice.reducer;
export const { changeFilter } = FilterSlice.actions;
export const FilterSelector = state => state.filter;