const ToDoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    default:
      Error("Action type is not defined");
      return state;
  }
};

export default ToDoReducer;
