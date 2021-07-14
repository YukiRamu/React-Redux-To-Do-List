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
      state.toDoList.push(action.payload);
      //add to local storage
    },
    compToDo: (state, action) => {
      console.log(action.payload);
      //update if comp id matches the list item
      state.toDoList.map((elem, index) => elem.id == action.payload.id && state.toDoList.splice(index, 1, action.payload));
    }
  }
});

//export reducer, actions,and state(selector)
export default ToDoSlice.reducer;
export const { addToDo, compToDo } = ToDoSlice.actions;
export const ToDoListSelector = state => state.toDo.toDoList;