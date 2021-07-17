import { configureStore } from '@reduxjs/toolkit';
import ToDoReducer from "./ToDoSlice";
import FilterReducer from "./FilterSlice";
import { save, load } from 'redux-localstorage-simple';

export const store = configureStore({
  reducer: {
    toDo: ToDoReducer, //naming convention xxxReducer
    filter: FilterReducer
  },
  /* Loading from LocalStorage happens during
    creation of the Redux store. */
  preloadedState: load(), // get data from localstorage
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()), //save
});

