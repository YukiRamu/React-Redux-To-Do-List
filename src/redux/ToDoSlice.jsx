/* Slice.jsx handles all basic configuration on Redux */
import { createSlice } from '@reduxjs/toolkit';

const ToDoSlice = createSlice({
  name: "toDo",
  initialState: [],
  reducers: {
    //define action methods -- needs to return
    addToDo: (state, action) => {
      state.push(action.payload);
      //////////// add to local storage ////////////
    },
    deleteToDo: (state, action) => {
      //delete from state
      return state.filter(elem => elem.id != action.payload.id);
    },
    statusChange: (state, action) => {
      //complete, edit, or save
      console.log(action.payload);
      //update state
      state.map((elem, index) => elem.id == action.payload.id && state.splice(index, 1, action.payload));
    }
  }
});

//export reducer, actions,and state(selector)
export default ToDoSlice.reducer;
export const { addToDo, deleteToDo, statusChange } = ToDoSlice.actions;
export const ToDoListSelector = state => state.toDo;