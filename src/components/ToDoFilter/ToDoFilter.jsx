import React, { useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ToDoListSelector, filterToDo } from '../../redux/ToDoSlice';
import { FilterSelector, changeFilter } from '../../redux/FilterSlice';
import { Button } from 'react-bootstrap';
import "./ToDoFilter.css";
import { AlertContext } from '../AlertModal/AlertModal';

const ToDoFilter = () => {

  //Get state from ToDoSlice.jsx
  const toDoList = useSelector(ToDoListSelector);

  //Get state from FilterSlice.jsx
  const filter = useSelector(FilterSelector);

  //Use dispatch method from redux
  const dispatch = useDispatch();

  //Alert
  const { setAlertModal } = useContext(AlertContext);

  //method
  const filterItem = (condition) => {
    //if it is an editing mode, show alert and return false;
    if (filter.editMode) {
      setAlertModal({ show: true, msg: "Oops! You haven't save your task." });
      return false;
    } else {
      //prepare action methods
      const showAllAction = () => {
        return toDoList.map(elem => (
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
        return toDoList.map(
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
        return toDoList.map(
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
      switch (condition) {
        case "all":
          dispatch(filterToDo(showAllAction()));
          dispatch(changeFilter("all"));
          break;
        case "inProgress":
          dispatch(filterToDo(showInProgressAction()));
          dispatch(changeFilter("inProgress"));
          break;
        case "complete":
          dispatch(filterToDo(showCompleteAction()));
          dispatch(changeFilter("complete"));
          break;
        default:
          throw Error("Invalid condition");
      }
    }
  };

  return (
    <>
      <div className="filter">
        <Button
          className={[
            "showAll",
            filter.filter === "all" && "selected"
          ].join(' ')}
          onClick={() => filterItem("all")}> All</Button>
        <Button
          className={[
            "InprogressFilter",
            filter.filter === "inProgress" && "selected"
          ].join(' ')}
          onClick={() => filterItem("inProgress")}>In Progress</Button>
        <Button
          className={[
            "compFilter",
            filter.filter === "complete" && "selected"
          ].join(' ')}
          onClick={() => filterItem("complete")}> Complete</Button>
      </div>
    </>
  );
};

export default ToDoFilter;
