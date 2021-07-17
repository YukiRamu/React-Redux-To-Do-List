import { configureStore } from '@reduxjs/toolkit';
import ToDoReducer from "./ToDoSlice";
import FilterReducer from "./FilterSlice";
import { save } from 'redux-localstorage-simple';

export const store = configureStore({
  reducer: {
    toDo: ToDoReducer, //naming convention xxxReducer
    filter: FilterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save({ states: ["toDo"] })), //save
});

