import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-bootstrap';
import "./ToDoFilter.css";

const ToDoFilter = () => {

  //
  return (
    <>
      <div className="filter">
        <Button>In Progress</Button>
        <Button>Done</Button>
      </div>
    </>
  );
};

export default ToDoFilter;
