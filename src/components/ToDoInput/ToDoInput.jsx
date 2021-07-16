import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addToDo, filterToDo, ToDoListSelector } from '../../redux/ToDoSlice';
import { FilterSelector, changeFilter } from '../../redux/FilterSlice';
import "./ToDoInput.css";
import uuid from 'react-uuid';
import { Form, Button } from 'react-bootstrap';
import { FiAlertOctagon } from "react-icons/fi";

const ToDoInput = () => {

  //Get state from ToDoSlice.jsx
  const toDoList = useSelector(ToDoListSelector);
  const filter = useSelector(FilterSelector);

  //Use dispatch method from redux 
  const dispatch = useDispatch();

  //Private state hook for the input
  const [item, setItem] = useState("");
  const [error, setError] = useState("");

  //method
  const addToDoItem = (e) => {
    e.preventDefault();

    if (item === "") {
      setError("Please enter your task");
      setTimeout(() => { setError(""); }, 2000);
    } else {
      /* dispatch */
      //#1 update visibility - show all for the existing toDos
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
        {error && <p className="errorMsg"><FiAlertOctagon /> {error}</p>}
      </div>
    </>
  );
};

export default ToDoInput;
