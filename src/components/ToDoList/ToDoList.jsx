import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ToDoListSelector, deleteToDo, statusChange } from '../../redux/ToDoSlice';
import "./ToDoList.css";
import { Form, Row, Button, Col } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiFillCheckSquare } from "react-icons/ai";
import MediaQueryContext from '../../contexts/MediaQueryContext';

const ToDoList = () => {

  //Responsive design
  const { isSmartPhone, isMobile, isTablet, isDesktop, isLargeDesktop } = useContext(MediaQueryContext);

  //Get state from slice.jsx
  const toDoList = useSelector(ToDoListSelector);

  console.log("I am here", toDoList);

  //Use dispatch method from redux
  const dispatchToDoList = useDispatch();

  //Private state hook
  const [editItem, setEditItem] = useState("");

  //methods
  /* complete */
  // const completeToDoItem = (id) => {
  //   //find which item is completed
  //   let compItem = toDoList.filter(elem => elem.id === id);

  //   //change IsCompleted flag and dispatch
  //   dispatchToDoList(completeToDo({
  //     item: compItem[0].item,
  //     isCompleted: true, //change
  //     isDeleted: false,
  //     isEditing: false,
  //     id: compItem[0].id
  //   }));
  // };

  /* delete */
  const deleteToDoItem = (id) => {
    //find which item is completed  -----> will be refactored. just pass id or index. isDeleted  not needed
    let delItem = toDoList.filter(elem => elem.id === id);

    //change isDeleted flag and dispatch
    dispatchToDoList(deleteToDo({
      item: delItem[0].item,
      isCompleted: delItem[0].isCompleted,
      isDeleted: true, //change
      isEditing: delItem[0].isEditing,
      id: delItem[0].id,
    }));
  };

  /* edit */
  // const editToDoItem = (id) => {
  //   //find which item is edited
  //   let editItem = toDoList.filter(elem => elem.id === id);
  //   console.log(editItem);

  //   //change isEditing flag and dispatch
  //   dispatchToDoList(editToDo({
  //     item: editItem[0].item,
  //     isCompleted: editItem[0].isCompleted,
  //     isDeleted: editItem[0],
  //     isEditing: true,//change
  //     id: editItem[0].id,
  //   }));
  // };

  /* status change - complete, edit, or save*/
  const itemStatusChange = (id, status) => {

    console.log("editing item is ", editItem);

    //find which item is edited
    let targetItem = toDoList.filter(elem => elem.id === id);

    //payload object
    const payload = {
      item: targetItem[0].item,
      isCompleted: false,
      isDeleted: false,
      isEditing: false,
      id: targetItem[0].id,
    };

    //change flag based on status
    switch (status) {
      case "complete":
        payload.isCompleted = true;
        dispatchToDoList(statusChange(payload));
        break;
      case "edit":
        setEditItem(targetItem[0].item); //to show the current task in the input field
        payload.isEditing = true;
        dispatchToDoList(statusChange(payload));
        break;
      case "save":
        payload.item = editItem;
        payload.isEditing = false;
        dispatchToDoList(statusChange(payload));
        break;
      default:
        Error("Invalid status");
        break;
    }

    // try {
    //   //change flag based on status
    //   switch (status) {
    //     case "complete":
    //       payload.isCompleted = true;
    //       break;
    //     case "edit":
    //       payload.isEditing = true;
    //       break;
    //     case "save":
    //       payload.isEditing = false;
    //       break;
    //     default:
    //       Error("Invalid status");
    //       break;
    //   }
    // } catch (error) {
    //   console.error(`${error} something went wrong`);
    // } finally {
    //   dispatchToDoList(statusChange(payload));
    // }

  };

  return (
    <>
      <div className="toDosContainer">
        {!toDoList.length == 0 ? (
          <>
            {/* Filter */}
            <div className="filter">
              <Button>In Progress</Button>
              <Button>Done</Button>
            </div>

            {/* To do list */}
            {/* Smartphone and Landscape view */}
            {(isSmartPhone || isMobile) && <>
              {toDoList.map(elem => (
                <Row
                  key={elem.id}
                  className="taskCard" >
                  <Col
                    data-id={elem.id}
                    className={[
                      "task",
                      elem.isCompleted && "complete"
                    ].join(' ')}>

                    {!elem.isEditing ?
                      <p>{elem.item}</p> :
                      <Form.Control
                        type="text"
                        value={editItem}
                        onChange={e => setEditItem(e.target.value)} />
                    }

                    <div className="btns">
                      {/* complete */}
                      <Button
                        className="compBtn"
                        onClick={() => itemStatusChange(elem.id, "complete")}
                        disabled={elem.isCompleted || elem.isEditing ? true : false}>Done</Button>

                      {/* edit */}
                      {!elem.isEditing ?
                        <Button
                          className="editBtn"
                          onClick={() => itemStatusChange(elem.id, "edit")}
                          disabled={elem.isCompleted ? true : false}><AiFillEdit /></Button> :
                        <Button
                          className="saveBtn"
                          onClick={() => itemStatusChange(elem.id, "save")}><AiFillCheckSquare /></Button>}

                      {/* delete */}
                      <Button
                        className="deleteBtn"
                        onClick={() => deleteToDoItem(elem.id)}><AiFillDelete /></Button>
                    </div>
                  </Col>
                </Row>
              ))}
            </>}

            {/* Tablet, Desktop, and Large Desktop view */}
            {(isTablet || isDesktop || isLargeDesktop) && <>
              <Row
                key={toDoList.id}
                className="taskCard tablet" >
                {toDoList.map(elem => (
                  <Col
                    data-id={elem.id}
                    className={[
                      "col-md-5 col-lg-4 col-xl-3 task tabletTask",
                      elem.isCompleted ? "complete" : "imcomplete"
                    ].join(' ')}>

                    {!elem.isEditing ?
                      <p>{elem.item}</p> :
                      <Form.Control
                        type="text"
                        value={editItem}
                        onChange={e => setEditItem(e.target.value)} />
                    }

                    <div className="btns">
                      {/* complete */}
                      <Button
                        className="compBtn"
                        onClick={() => itemStatusChange(elem.id, "complete")}
                        disabled={elem.isCompleted || elem.isEditing ? true : false}>Done</Button>

                      {/* edit */}
                      {!elem.isEditing ?
                        <Button
                          className="editBtn"
                          onClick={() => itemStatusChange(elem.id, "edit")}
                          disabled={elem.isCompleted ? true : false}><AiFillEdit /></Button> :
                        <Button
                          className="saveBtn"
                          onClick={() => itemStatusChange(elem.id, "save")}><AiFillCheckSquare /></Button>}

                      {/* delete */}
                      <Button
                        className="deleteBtn"
                        onClick={() => deleteToDoItem(elem.id)}><AiFillDelete /></Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </>}
          </>
        ) : (<h2 className="msg">No task left :) Good job!</h2>)}
      </div>
    </>
  );
};

export default ToDoList;
