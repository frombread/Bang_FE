import React, { useEffect } from "react";
import axios from "axios";

interface RemoveProps {
    id: string | undefined;

}
const Remove: React.FC<RemoveProps> = ({ id }) => {
    useEffect(() => {
        const RemoveData = async (id:string) => {
            try {
                await axios.delete(`http://localhost:8080/patients/remove/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if(id){
            RemoveData(id);
        }
    }, [id]);
    return null;
}
export default Remove;