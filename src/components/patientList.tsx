import React, { useEffect, useState } from 'react';
import axios from "axios";


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

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get(`http://localhost:8080/patients/`, {
                    params: {
                        page: 1,
                        pageSize: 10,
                    },
                });
                setPatients(response.data);
            } catch (error) {
                console.error('불러오기 실패 :', error);
                alert('불러오기 실패');
            }
        }
        fetchPatients();
    }, []);

    return (
        <div>
            <h2>환자 목록</h2>
            <ul>
                {patients.map(patient => (
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
        </div>
    );
};

export default PatientList;
