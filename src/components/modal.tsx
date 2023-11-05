import React, {useEffect, useState} from "react";
import "../styles/modal.css";
import Read from "./read";
import Remove from "./remove";


interface ModalProps {
    id: string | undefined;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, closeModal }) => {
    const [del, setDel] = useState(false);

    const handleDelete = () => {
        console.log("handleDelete 함수 호출됨");
        setDel(true);
    }


    return (
        <div className="modal" style={{ display: id ? 'block' : 'none' }}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <Read id={id} />
                <button onClick={() => {handleDelete();}} type="button">삭제</button>
                {del && (
                    <Remove id={id} />
                )}
                <button onClick={() => {/* 업데이트 컴포넌트 실행 */}} type="button">업데이트</button>
            </div>
        </div>
    );
};

export default Modal;
