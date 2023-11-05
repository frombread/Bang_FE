import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/read.css";
import Remove from "./remove";
import Update from "./update"; // 스타일 파일 import

interface ReadProps {
    id: string | undefined;
}

const Read: React.FC<ReadProps> = ({ id }) => {
    const [data, setData] = useState<any>(null);
    const [del, setDel] = useState(false);

    const handleDelete = () => {
        console.log("handleDelete 함수 호출됨");
        setDel(true);
    };

    const handleDeleteConfirmation = (confirm: boolean) => {
        if (confirm) {
            handleDelete(); // 삭제 확정 시 handleDelete 함수 호출
        }
    };

    useEffect(() => {
        const fetchData = async (id:string) => {
            try {
                const response = await axios.get(`http://localhost:8080/patients/read/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if(id){
            fetchData(id);
        }
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="read-container">
            <div className="read-item">이름: {data.name}</div>
            <div className="read-item">Gender: {data.gender}</div>
            <div className="read-item">Date of Birth: {data.dateOfBirth}</div>
            <div className="read-item">Disease: {data.disease}</div>
            <div className="read-item">Body Parts: {data.bodyParts.join(", ")}</div>
            {data.notes && <div className="read-item">Notes: {data.notes}</div>}

            <button onClick={() => handleDeleteConfirmation(window.confirm("정말로 삭제하시겠습니까?"))} type="button">
                삭제
            </button>
            {del && <Remove id={id}/>}
            <button onClick={() => {}} type="button">
                <Update id ={id} patientData={data}/>
            </button>
        </div>

    );
}

export default Read;
