/* Slice.jsx handles all basic configuration on Redux */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toDoList: []
};

const ToDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    //define action types
    addToDo: (state, action) => {
      console.log(action.payload);
      state.toDoList.push(action.payload);
      //add to local storage
    }
  }
});

//export actions, reducer, and state(selector)
export const { addToDo } = ToDoSlice.actions;
export default ToDoSlice.reducer;
export const ToDoListSelector = state => state.toDo.toDoList;