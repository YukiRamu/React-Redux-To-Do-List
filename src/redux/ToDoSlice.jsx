/* Slice.jsx handles all basic configuration on Redux */
import { createSlice } from '@reduxjs/toolkit';
import { load } from 'redux-localstorage-simple';

const initialization = () => {
  //get to do data from localStorage
  if (load({ states: ["toDo"] }).hasOwnProperty("toDo")) {
    return load({ states: ["toDo"] }).toDo.map(elem => (
      {
        item: elem.item,
        isCompleted: elem.isCompleted,
        isDeleted: elem.isDeleted,
        isEditing: false,//always non-editing mode
        isVisible: true, //always show all
        id: elem.id
      }
    ));
  } else {
    return [];
  }
};

const ToDoSlice = createSlice({
  name: "toDo",
  initialState: initialization(),
  reducers: {
    addToDo: (state, action) => {
      //update state
      return [...state, action.payload];
    },
    deleteToDo: (state, action) => {
      //delete from state
      return state.filter(elem => elem.id != action.payload.id);
    },
    statusChange: (state, action) => {
      //complete, edit, or save
      //update state
      state.map((elem, index) => elem.id == action.payload.id && state.splice(index, 1, action.payload));
    },
    filterToDo: (state, action) => {
      return action.payload;
    }
  }
});

//export reducer, actions,and state(selector)
export default ToDoSlice.reducer;
export const { addToDo, deleteToDo, statusChange, filterToDo } = ToDoSlice.actions;
export const ToDoListSelector = state => state.toDo;