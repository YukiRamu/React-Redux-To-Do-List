// import React, { createContext, useReducer, useEffect } from 'react';
// import ToDoReducer from '../reducers/ToDoReducer';

// const ToDoContext = createContext();

// const ToDoProvider = (props) => {

//   /* ToDoReducer */
//   const [ToDolist, dispatchToDoList] = useReducer(
//     ToDoReducer,
//     [],
//     () => {
//       const localStorageData = localStorage.getItem("toDo");
//       return {
//         items: localStorageData ? JSON.parse(localStorageData) : [],
//         IsCompleted: false,
//         IsDeleted: false
//       };
//     });

//   /* Update Local Storage */
//   useEffect(() => {
//     localStorage.setItem("toDo", JSON.stringify(ToDolist.items));
//   }, [ToDolist.items]);

//   return (
//     <>
//       <ToDoContext.Provider value={ToDolist, dispatchToDoList}>
//         {props.children}
//       </ToDoContext.Provider>
//     </>
//   );
// };

// export { ToDoContext as default, ToDoProvider };
