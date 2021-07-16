import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ToDoListSelector, filterToDo } from '../../redux/ToDoSlice';
import { Button } from 'react-bootstrap';
import "./ToDoFilter.css";

const ToDoFilter = () => {

  //Get state from slice.jsx
  const toDoList = useSelector(ToDoListSelector);
  console.log("I am in filter jsx", toDoList);

  //Use dispatch method from redux
  const dispatchFilter = useDispatch();

  //methods
  const filterItem = (condition) => {

    //prepare action methods
    let filteredToDoList;
    const showAllAction = () => {
      return filteredToDoList = toDoList.map(elem => (
        {
          item: elem.item,
          isCompleted: elem.isCompleted,
          isDeleted: elem.isDeleted,
          isEditing: elem.isEditing,
          isVisible: true, //show all
          id: elem.id
        }
      ));
    };

    const showInProgressAction = () => {
      return filteredToDoList = toDoList.map(
        elem => !elem.isCompleted ?
          {
            item: elem.item,
            isCompleted: elem.isCompleted,
            isDeleted: elem.isDeleted,
            isEditing: elem.isEditing,
            isVisible: true, //show in progress items
            id: elem.id
          } :
          {
            item: elem.item,
            isCompleted: elem.isCompleted,
            isDeleted: elem.isDeleted,
            isEditing: elem.isEditing,
            isVisible: false, //hide complete items
            id: elem.id
          });
    };

    const showCompleteAction = () => {
      return filteredToDoList = toDoList.map(
        elem => elem.isCompleted ?
          {
            item: elem.item,
            isCompleted: elem.isCompleted,
            isDeleted: elem.isDeleted,
            isEditing: elem.isEditing,
            isVisible: true, //show complete items
            id: elem.id
          } :
          {
            item: elem.item,
            isCompleted: elem.isCompleted,
            isDeleted: elem.isDeleted,
            isEditing: elem.isEditing,
            isVisible: false, //hide inProgress items
            id: elem.id
          });
    };

    //dispatch payload based on filter condition
    if (condition === undefined) throw new Error("Invalid condition");
    condition === "all" && dispatchFilter(filterToDo(showAllAction()));
    condition === "inProgress" && dispatchFilter(filterToDo(showInProgressAction()));
    condition === "complete" && dispatchFilter(filterToDo(showCompleteAction()));
  };

  return (
    <>
      <div className="filter">
        <Button
          className="showAll"
          onClick={() => filterItem("all")}> All</Button>
        <Button
          className="InprogressFilter"
          onClick={() => filterItem("inProgress")}>In Progress</Button>
        <Button
          className="compFilter"
          onClick={() => filterItem("complete")}> Complete</Button>
      </div>
    </>
  );
};

export default ToDoFilter;
