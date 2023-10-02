// components/Modal.js
import { useState } from "react";

export default function Modal({ header, meaning, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>{header}</h2>
          <h4>{meaning}</h4>
          <button onClick={onClose}>Close Modal</button>
        </div>
      </div>
    </div>
  );
}
