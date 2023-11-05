import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from '../styles/App.module.css';
import { useQuery } from 'react-query';

interface BodyPart {
    name: string;
}

interface Disease {
    name: string;
}

const Create:React.FC =()=> {
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("M");
    const [dateOfBirth, setDateOfBirth] = useState<number>();
    const [disease, setDisease] = useState<string>("");
    const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
    const [notes, setNotes] = useState<string>("");
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


    const create = async ()=> {
        try {
            const bodyParts = selectedBodyParts;
            const response = await axios.post(
                `http://localhost:8080/patients/create`, {
                    name, gender, dateOfBirth, disease, bodyParts, notes
                }
            );
            console.log(response.data);
            window.location.reload();
        }catch(error){
            console.error("저장 실패 :", error);
            alert("저장 실패")
        }

    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedBodyParts([...selectedBodyParts, value]);
        } else {
            setSelectedBodyParts(selectedBodyParts.filter((part) => part !== value));
        }
    };

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>환자 등록</h1>
            <div className={styles.form}>
                <label htmlFor="name">이름:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="환자의 이름을 입력하세요"
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
                    {bodyPartsList.map((partName:string) => (
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

                <button onClick={create} className={styles.button}>저장!</button>

            </div>

        </div>

    )
}
export default Create;