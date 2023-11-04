import React, { useState, useEffect } from 'react';
import Create from "../../components/create";
import axios from "axios";
import "../../styles/main.css";
import Read from "../../components/read"; // 스타일 파일 import
interface Patient {
    name: string;
    gender:string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string;
    notes?:string;
}


const Main: React.FC = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState<Patient[]>([]);

    const clickCreateButton = () => {
        setShowCreate(!showCreate);
    }

    //TODO 캐싱 넣자..
    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get(`http://localhost:8080/patients/`);
                setPatients(response.data);
            } catch (error) {
                console.error("불러오기 실패 :", error);
                alert("불러오기 실패")
            }
        }

        fetchPatients();
    }, []);

    return (
        <div className="main-container"> {/* main-container 클래스 추가 */}
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
                            <li key={patient.name} onClick={() =>
                                <Read name={patient.name} gender={patient.gender} dateOfBirth={patient.dateOfBirth} disease={patient.disease} bodyParts={patient.bodyParts} notes={patient.notes}/>}>
                                환자 이름: {patient.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Main;
