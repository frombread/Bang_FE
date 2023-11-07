import React, { useState } from "react";
import "../styles/modal.css";
import Read from "./read";
// import Remove from "./remove";

interface ModalProps {
    id: string | undefined;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, closeModal }) => {

    return (
        <div className="modal" style={{ display: id ? "block" : "none" }}>
            <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
                <Read id={id} />
            </div>
        </div>
    );
};

export default Modal;