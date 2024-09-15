import React, { useState } from "react";
import "../AlertBox.css";

const AlertBox = ({ message, onClose, okHandler, closeRequired }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          {closeRequired && (
            <span className="popup-close" onClick={onClose}>
              &times;
            </span>
          )}
        </div>
        <div className="popup-body">
          <p>{message}</p>
        </div>
        <div className="popup-footer">
          <button className="ok-button" onClick={okHandler}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
