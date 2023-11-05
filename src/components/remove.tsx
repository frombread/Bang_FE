import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RemoveProps {
    id: string | undefined;

}
const Remove: React.FC<RemoveProps> = ({ id }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Remove 컴포넌트 렌더링됨");
        const fetchData = async (id:string) => {
            try {
                await axios.delete(`http://localhost:8080/patients/remove/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if(id){
            fetchData(id);
        }
    }, [id, navigate]);

    return null;
}


export default Remove;
