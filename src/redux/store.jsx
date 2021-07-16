import { configureStore } from '@reduxjs/toolkit';
import ToDoReducer from "./ToDoSlice";
import { save, load } from 'redux-localstorage-simple';

export const store = configureStore({
  reducer: {
    toDo: ToDoReducer
  },
});

