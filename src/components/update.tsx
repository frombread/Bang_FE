import React, {useEffect, useState} from "react";
import axios from "axios";
import {useQuery} from "react-query";
import styles from "../styles/App.module.css";

interface BodyPart {
    name: string;
}
interface Disease {
    name: string;
}
interface UpdateProps {
    id: string | undefined;
    closeUpdate: ()=>void;

    patientData: {
        _id:string;
        name: string;
        gender: string;
        dateOfBirth: number;
        disease: string;
        bodyParts: string[];
        notes?: string;
    }
}
const Update: React.FC<UpdateProps> = ({ id,patientData ,closeUpdate}) => {
    const [name, setName] = useState<string>(patientData.name);
    const [gender, setGender] = useState<string>(patientData.gender);
    const [dateOfBirth, setDateOfBirth] = useState<number>(patientData.dateOfBirth);
    const [disease, setDisease] = useState<string>(patientData.disease);
    const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>(patientData.bodyParts);
    const [notes, setNotes] = useState<string>(patientData.notes || "");


    const fetchBodyParts = async () => {
        const response = await fetch('http://localhost:8080/bodyparts');
        const data = await response.json();
        return data.map((part: BodyPart) => part.name);
    }

    const fetchDiseases = async () => {
        const response = await fetch('http://localhost:8080/diseases');
        const data = await response.json();
        return data.map((disease: Disease) => disease.name);
    }

    const { data: bodyPartsList = [] } = useQuery('bodyParts', fetchBodyParts);
    const { data: diseasesList = [] } = useQuery('diseases', fetchDiseases);

    const updateData = async (id: string) => {
        const updateData = {
            name: name,
            gender: gender,
            dateOfBirth: dateOfBirth,
            disease: disease,
            bodyParts: selectedBodyParts,
            notes: notes
        };
        try {
            const response = await axios.put(`http://localhost:8080/patients/update/${id}`, updateData);
            closeUpdate()
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedBodyParts(prevBodyParts => {
            if (prevBodyParts.includes(value)) {
                return prevBodyParts.filter(part => part !== value);
            } else {
                return [...prevBodyParts, value];
            }
        });
    };

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>환자 업데이트</h1>
            <div className={styles.form}>
                <label htmlFor="name">이름:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={patientData.name}
                />

                <label htmlFor="gender">성별:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="M">남성</option>
                    <option value="F">여성</option>
                </select>

                <label htmlFor="dateOfBirth">생년월일:</label>
                <input
                    id="dateOfBirth"
                    type="number"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(Number(e.target.value))}
                />

                <label htmlFor="disease">기저질환:</label>
                <select
                    id="disease"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                >
                    <option value="">질병을 선택하세요</option>
                    {diseasesList.map((diseaseName:string) => (
                        <option key={diseaseName} value={diseaseName}>
                            {diseaseName}
                        </option>
                    ))}
                </select>

                <label htmlFor="selectedBodyParts">통증부위:</label>
                <div id="bodyPartsCheckboxes">
                    {bodyPartsList.map((partName: string) => (
                        <label key={partName}>
                            <input
                                type="checkbox"
                                value={partName}
                                checked={selectedBodyParts.includes(partName)}
                                onChange={handleCheckboxChange}
                            />
                            {partName}
                        </label>
                    ))}
                </div>
                <label htmlFor="notes">비고:</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="환자에 대한 추가적인 메모를 입력하세요"
                />

                <button onClick={() => updateData(patientData._id)} className={styles.button}>업데이트</button>
                <button onClick={closeUpdate} className={styles.button}>취소</button>
            </div>

        </div>

    );
}
export default Update;