import React, { useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ToDoListSelector, compToDo } from '../../features/ToDoSlice';
import "./ToDoList.css";
import { Row, Button, Col } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiFillCheckSquare } from "react-icons/ai";
import MediaQueryContext from '../../contexts/MediaQueryContext';

const ToDoList = () => {

  //Responsive design
  const { isSmartPhone, isMobile, isTablet, isDesktop, isLargeDesktop } = useContext(MediaQueryContext);

  //Get state from slice.jsx
  const toDoList = useSelector(ToDoListSelector);

  console.log(toDoList);

  //Use dispatch method from redux
  const dispatchToDoList = useDispatch();

  //methods
  const completeToDo = (e) => {
    console.log(e);
    console.log("id is ", e.target.parentElement.parentElement.dataset.id); //string
    //find which item is completed
    let compItem = toDoList.filter(elem => elem.id === e.target.parentElement.parentElement.dataset.id);
    console.log("compItem is", compItem);

    //change IsCompleted flag
    dispatchToDoList(compToDo({
      item: compItem[0].item,
      isCompleted: true,
      isDeleted: false,
      id: compItem[0].id
    }));
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
                      elem.isCompleted ? "complete" : "imcomplete"
                    ].join(' ')}>
                    <p>{elem.item}</p>
                    <div className="btns">
                      {/* complete */}
                      <Button
                        className="compBtn"
                        onClick={(e) => completeToDo(e)} >Done</Button>
                      {/* edit */}
                      {!elem.isEditing ?
                        <Button className="editBtn"><AiFillEdit /></Button> :
                        <Button className="saveBtn"><AiFillCheckSquare /></Button>}
                      {/* delete */}
                      <Button className="deleteBtn"><AiFillDelete /></Button>
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
                    <p>{elem.item}</p>
                    <div className="btns">
                      {/* complete */}
                      <Button
                        className="compBtn"
                        onClick={(e) => completeToDo(e)} >Done</Button>
                      {/* edit */}
                      {!elem.isEditing ?
                        <Button className="editBtn"><AiFillEdit /></Button> :
                        <Button className="saveBtn"><AiFillCheckSquare /></Button>}
                      {/* delete */}
                      <Button className="deleteBtn"><AiFillDelete /></Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </>}
          </>
        ) : (<h2 className="msg">No task left :) Good work!</h2>)}
      </div>
    </>
  );
};

export default ToDoList;
