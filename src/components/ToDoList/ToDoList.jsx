import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ToDoListSelector, deleteToDo, statusChange } from '../../redux/ToDoSlice';
import "./ToDoList.css";
import { Form, Row, Button, Col, Modal } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiFillCheckSquare } from "react-icons/ai";
import MediaQueryContext from '../../contexts/MediaQueryContext';
import ToDoFilter from '../ToDoFilter/ToDoFilter';

const ToDoList = () => {

  //Responsive design
  const { isSmartPhone, isMobile, isTablet, isDesktop, isLargeDesktop } = useContext(MediaQueryContext);

  //Get state from ToDoSlice.jsx
  const toDoList = useSelector(ToDoListSelector);

  console.log("I am here", toDoList);

  //Use dispatch method from redux
  const dispatch = useDispatch();

  //Private state hook
  const [editItem, setEditItem] = useState("");
  const [alertModal, setAlertModal] = useState(false);

  //methods
  /* delete */
  const deleteToDoItem = (id) => {
    //find which item is completed  -----> will be refactored. just pass id or index. isDeleted  not needed
    let delItem = toDoList.filter(elem => elem.id === id);

    //change isDeleted flag and dispatch
    dispatch(deleteToDo({
      item: delItem[0].item,
      isCompleted: delItem[0].isCompleted,
      isDeleted: true, //change
      isEditing: delItem[0].isEditing,
      isVisible: true,
      id: delItem[0].id,
    }));
  };

  /* status change - complete, edit, or save*/
  const changeItemStatus = (id, status) => {

    //find which item is on target
    let targetItem = toDoList.filter(elem => elem.id === id);

    //prepare payload object
    const payload = {
      item: targetItem[0].item,
      isCompleted: false,
      isDeleted: false,
      isEditing: false,
      isVisible: true,
      id: targetItem[0].id,
    };

    //prepare action methods
    const completeAction = () => {
      payload.isCompleted = true;
      return payload;
    };

    const editAction = () => {
      setEditItem(targetItem[0].item); //to show the current task in the input field
      payload.isEditing = true;
      return payload;
    };

    const saveAction = () => {
      //input validation check
      editItem === "" ?
        setAlertModal(true)
        : payload.item = editItem; payload.isEditing = false; return payload;
    };

    //dispatch payload based on status
    if (status === undefined) throw new Error("Invalid status");
    status === "complete" && dispatch(statusChange(completeAction()));
    status === "edit" && dispatch(statusChange(editAction()));
    status === "save" && dispatch(statusChange(saveAction()));
  };

  return (
    <>
      <div className="toDosContainer">
        {!toDoList.length == 0 ? (
          <>
            {/* Filter */}
            <ToDoFilter />

            {/* To do list */}
            {/* Smartphone and Landscape view */}
            {(isSmartPhone || isMobile) && <>
              {toDoList.map(elem => (
                //show only "isVisible is true" items
                elem.isVisible === true &&
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
                        className="editBox"
                        value={editItem}
                        onChange={e => setEditItem(e.target.value)} />
                    }

                    <div className="btns">
                      {/* complete */}
                      <Button
                        className="compBtn"
                        onClick={() => changeItemStatus(elem.id, "complete")}
                        disabled={elem.isCompleted || elem.isEditing ? true : false}>Done</Button>

                      {/* edit */}
                      {!elem.isEditing ?
                        <Button
                          className="editBtn"
                          onClick={() => changeItemStatus(elem.id, "edit")}
                          disabled={elem.isCompleted ? true : false}><AiFillEdit /></Button> :
                        <Button
                          className="saveBtn"
                          onClick={() => changeItemStatus(elem.id, "save")}><AiFillCheckSquare /></Button>}

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
                  //show only "isVisible is true" items
                  elem.isVisible === true &&
                  <Col
                    data-id={elem.id}
                    className={[
                      "col-md-5 col-lg-4 col-xl-3 task tabletTask",
                      elem.isCompleted && "complete"
                    ].join(' ')}>

                    {!elem.isEditing ?
                      <p>{elem.item}</p> :
                      <Form.Control
                        as="textarea"
                        //wrap="soft"
                        className="editBox"
                        value={editItem}
                        onChange={e => setEditItem(e.target.value)} />
                    }

                    <div className="btns">
                      {/* complete */}
                      <Button
                        className="compBtn"
                        onClick={() => changeItemStatus(elem.id, "complete")}
                        disabled={elem.isCompleted || elem.isEditing ? true : false}>Done</Button>

                      {/* edit */}
                      {!elem.isEditing ?
                        <Button
                          className="editBtn"
                          onClick={() => changeItemStatus(elem.id, "edit")}
                          disabled={elem.isCompleted ? true : false}><AiFillEdit /></Button> :
                        <Button
                          className="saveBtn"
                          onClick={() => changeItemStatus(elem.id, "save")}><AiFillCheckSquare /></Button>}

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
      {/* Alert Modal for editing */}
      {alertModal &&
        <Modal
          className="alertModal"
          show={alertModal}
          onHide={() => setAlertModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm" className="alert">
              Please enter your task
            </Modal.Title>
            <Button
              className="clsBtn"
              onClick={() => setAlertModal(false)}>Close</Button>
          </Modal.Header>
        </Modal>}
    </>
  );
};

export default ToDoList;
