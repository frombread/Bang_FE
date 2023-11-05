import React, { useState } from 'react';
import Create from "../../components/create";
import Modal from "../../components/modal";
import PatientList from "../../components/patientList"; // PatientList 컴포넌트를 추가합니다.
import "../../styles/main.css"
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
    const [showCreate, setShowCreate] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedPatient(null);
        setShowModal(false);
    };

    const clickCreateButton = () => {
        setShowCreate(!showCreate);
    };

    return (
        <div className="main-container">
            <h1>Main Room Component</h1>
            <div>
                <button onClick={clickCreateButton}>create</button>
                {showCreate && <Create />}
            </div>

            {!showCreate && (
                <PatientList openModal={openModal} setSelectedPatient={setSelectedPatient} />
            )}

            {showModal && (
                <Modal id={selectedPatient?._id} closeModal={closeModal} />
            )}
        </div>
    );
};

export default Main;
