import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/modal";
import PatientList from "../../components/patientList";

interface Patient {
    _id: string;
    name: string;
    gender: string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string;
    notes?: string;
}

const Main: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedPatient(null);
        setShowModal(false);
    };

    return (
        <MainContainer>
            <HeaderContainer></HeaderContainer>
            <BoxContainer>
                <PatientList
                    openModal={openModal}
                    setSelectedPatient={setSelectedPatient}
                />
            </BoxContainer>

            {showModal && <Modal id={selectedPatient?._id} closeModal={closeModal} />}
        </MainContainer>
    );
};

const MainContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const HeaderContainer = styled.div`
  max-width: 800px;
  height: 50px;
  background-color: #00aa63;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export default Main;
