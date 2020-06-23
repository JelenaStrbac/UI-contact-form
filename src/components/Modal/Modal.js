import React from "react";

import "./Modal.css";

const Modal = (props) => {
  return props.show ? (
    <div
      className="Backdrop"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      <div className="Backdrop_window">
        {props.modalMessage}
        <button onClick={props.clicked} className="Button">
          CLOSE
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;
