import React, { useState, createContext } from 'react';
import "./AlertModal.css";
import { Modal, Button } from 'react-bootstrap';

//create context
const AlertContext = createContext();

const AlertModal = (props) => {

  const [alertModal, setAlertModal] = useState({ show: false, msg: "" });

  return (
    <>
      <AlertContext.Provider value={{
        setAlertModal
      }}>
        {props.children}
      </AlertContext.Provider>

      {alertModal.show &&
        <Modal
          className="alertModal"
          show={alertModal.show}
          onHide={() => setAlertModal({ show: false, msg: "" })}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm" className="alert">
              {alertModal.msg}
            </Modal.Title>
            <Button
              className="clsBtn"
              onClick={() => setAlertModal({ show: false, msg: "" })}>Close</Button>
          </Modal.Header>
        </Modal>}
    </>
  );
};

export { AlertModal as default, AlertContext, };
