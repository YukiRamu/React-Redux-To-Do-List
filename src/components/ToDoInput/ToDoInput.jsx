import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToDo } from '../../redux/ToDoSlice';
import "./ToDoInput.css";
import uuid from 'react-uuid';
import { Form, Button } from 'react-bootstrap';
import { FiAlertOctagon } from "react-icons/fi";
//import ToDoContext from '../../contexts/ToDoContext';

const ToDoInput = () => {

  //Use dispatch method from redux
  const dispatchToDoList = useDispatch();

  //Private state hook
  const [item, setItem] = useState("");
  const [error, setError] = useState("");

  const addToDoItem = (e) => {
    e.preventDefault();

    if (item === "") {
      setError("Please enter your task");
      setTimeout(() => { setError(""); }, 2000);
    } else {
      //dispatch
      dispatchToDoList(addToDo({
        item: item,
        isCompleted: false,
        isDeleted: false,
        isEditing: false,
        id: uuid()
      }));
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
