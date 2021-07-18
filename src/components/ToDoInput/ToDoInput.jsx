import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addToDo, filterToDo, ToDoListSelector } from '../../redux/ToDoSlice';
import { FilterSelector, changeFilter } from '../../redux/FilterSlice';
import "./ToDoInput.css";
import uuid from 'react-uuid';
import { Form, Button } from 'react-bootstrap';
import { AlertContext } from '../AlertModal/AlertModal';

const ToDoInput = () => {

  //Get state from ToDoSlice.jsx
  const toDoList = useSelector(ToDoListSelector);
  const filter = useSelector(FilterSelector);

  //Use dispatch method from redux 
  const dispatch = useDispatch();

  //Private state hook for the input
  const [item, setItem] = useState("");

  //Alert
  const { setAlertModal } = useContext(AlertContext);

  //method
  const addToDoItem = (e) => {
    e.preventDefault();

    //if it is an editing mode, show alert and return false;
    if (filter.editMode) {
      setAlertModal({ show: true, msg: "Oops! You haven't save your task." });
      return false;
    } else {
      //validation check
      if (item === "") {
        setAlertModal({ show: true, msg: "Please enter your task!" });
      } else {
        /* dispatch */
        //#1 update visibility - filter back to "show all"
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
        dispatch(filterToDo(showAllAction()));

        //#2 add to do
        dispatch(addToDo({
          item: item,
          isCompleted: false,
          isDeleted: false,
          isEditing: false,
          isVisible: true,
          id: uuid()
        }));

        //#3 change filter to all
        dispatch(changeFilter("all"));

        //clear input
        setItem("");
      }
    }
  };

  return (
    <>
      <div className="inputFormContainer">
        <Form onSubmit={addToDoItem}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your task..."
              value={item}
              onChange={e => setItem(e.target.value)} />
          </Form.Group>
          <Button variant="outline-info" type="submit" className="addBtn">Add</Button>
        </Form>
      </div>
    </>
  );
};

export default ToDoInput;
