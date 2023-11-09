import React from "react";
import styled from "styled-components";
import Read from "./read";

interface ModalProps {
    id: string | undefined;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, closeModal }) => {
    return (
        <ModalContainer style={{ display: id ? "block" : "none" }}>
            <ModalContent>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <ReadContent>
                    <Read id={id} />
                </ReadContent>
            </ModalContent>
        </ModalContainer>
    );
};
const ModalContainer = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  max-width: 600px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const ReadContent =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default Modal;
