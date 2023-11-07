import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/patientList.css';

interface Patient {
    _id: string;
    name: string;
    gender: string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string;
    notes?: string;
}

interface PatientListProps {
    openModal: () => void;
    setSelectedPatient: (patient: Patient | null) => void;
}

const PatientList: React.FC<PatientListProps> = ({ openModal, setSelectedPatient }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [page, setPage] = useState(1);
    const [entirePage, setEntirePage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    async function fetchPatients(pageNum: number) {
        try {
            const response = await axios.get(`http://localhost:8080/patients/`, {
                params: {
                    page: pageNum,
                    pageSize: 10,
                },
            });
            setPatients(response.data.data);
            setEntirePage(response.data.pageNum);
        } catch (error) {
            console.error('불러오기 실패 :', error);
            alert('불러오기 실패');
        }
    }

    useEffect(() => {
        fetchPatients(page);
    }, [page,patients]);

    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= entirePage) {
            setPage(newPage);
        }
    }
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="patient-list-title">환자 목록</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="이름으로 검색"
            />
            <ul className="patient-list">
                {filteredPatients.map(patient => (
                    <li
                        key={patient._id}
                        onClick={() => {
                            setSelectedPatient(patient);
                            openModal();
                        }}
                    >
                        {patient.name} ({patient.dateOfBirth}) 님
                    </li>
                ))}
            </ul>
            <div className="page-buttons">
                {Array.from({ length: entirePage }, (_, index) => (
                    <button key={index + 1} onClick={() => changePage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
