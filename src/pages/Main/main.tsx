import React, { useState, useEffect } from 'react';
import Create from "../../components/create";
import axios from "axios";
import "../../styles/main.css";

import Modal from "../../components/modal";
import Read from "../../components/read";
import Remove from "../../components/remove";

interface Patient {
    _id:string;
    name: string;
    gender:string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string;
    notes?:string;
}

const Main: React.FC = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showModal, setShowModal] = useState(false);


    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setSelectedPatient(null);
        setShowModal(false);

    }
    const clickCreateButton = () => {
        setShowCreate(!showCreate);
    }

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get(`http://localhost:8080/patients/`,{
                    params:{
                        page: 1, pageSize: 10,
                    }
                });
                setPatients(response.data);
            } catch (error) {
                console.error("불러오기 실패 :", error);
                alert("불러오기 실패")
            }
        }
        fetchPatients();
    }, []);

    const [patients, setPatients] = useState<Patient[]>([]);

    return (
        <div className="main-container">
            <h1>Main Room Component</h1>
            <div>
                <button onClick={clickCreateButton}>create</button>
                {showCreate && <Create />}
            </div>

            {!showCreate && (
                <div>
                    <h2>환자 목록</h2>
                    <ul>
                        {patients.map(patient => (
                            <li key={patient._id} onClick={() => {
                                setSelectedPatient(patient);
                                openModal();
                            }}>
                                {patient.name} ({patient.dateOfBirth}) 님
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showModal && (
                <Modal id={selectedPatient?._id} closeModal={closeModal} />
            )}
        </div>
    );
};

export default Main;
