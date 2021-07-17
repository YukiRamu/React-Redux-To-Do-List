/* Slice.jsx handles filtering configuration on Redux */
import { createSlice } from '@reduxjs/toolkit';

const FilterSlice = createSlice({
  name: "filter",
  initialState: { filter: "all", editMode: false }, //all, inProgress, or complete & boolean
  reducers: {
    //define action methods -- needs to return
    changeFilter: (state, action) => {
      return { ...state, filter: action.payload };
    },
    changeEditMode: (state, action) => {
      return { ...state, editMode: action.payload };
    }
  }
});

//export reducer, actions,and state(selector)
export default FilterSlice.reducer;
export const { changeFilter, changeEditMode } = FilterSlice.actions;
export const FilterSelector = state => state.filter;