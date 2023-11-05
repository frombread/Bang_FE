import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/read.css"; // 스타일 파일 import

interface ReadProps {
    id: string | undefined;
}

const Read: React.FC<ReadProps> = ({ id }) => {
    const [data, setData] = useState<any>(null);

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
            <div className="read-item">Name: {data.name}</div>
            <div className="read-item">Gender: {data.gender}</div>
            <div className="read-item">Date of Birth: {data.dateOfBirth}</div>
            <div className="read-item">Disease: {data.disease}</div>
            <div className="read-item">Body Parts: {data.bodyParts}</div>
            {data.notes && <div className="read-item">Notes: {data.notes}</div>}
        </div>
    );
}

export default Read;
