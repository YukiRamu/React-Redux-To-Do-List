import React from 'react';
import { useSelector } from "react-redux";
import { ToDoListSelector } from '../../features/ToDoSlice';
import "./ToDoList.css";
import { Row, Button, Col } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiFillCheckSquare } from "react-icons/ai";

const ToDoList = () => {

  //Get state from slice.jsx
  const toDoList = useSelector(ToDoListSelector);

  //methods
  const completeToDo = (e) => {
    console.log(e);
    console.log("id is ", e.target.parentElement.parentElement.dataset.id); //string

  };
  return (
    <>
      <div className="toDosContainer">
        {!toDoList.length == 0 ? (
          <>
            {toDoList.map(elem => (
              <Row key={elem.id} data-id={elem.id} className="taskCard">
                <Col className="task">
                  <p>{elem.item}</p>
                  <div className="btns">
                    <Button
                      className="compBtn"
                      onClick={(e) => completeToDo(e)} >Done</Button>
                    <Button
                      className="editBtn"><AiFillEdit /></Button>
                    <Button
                      className="saveBtn"><AiFillCheckSquare /></Button>
                    <Button
                      className="deleteBtn"><AiFillDelete /></Button>
                  </div>
                </Col>
              </Row>
            ))}
          </>
        ) : (<h2 className="msg">No task left :) Good work!</h2>)}
      </div>
    </>
  );
};

export default ToDoList;
