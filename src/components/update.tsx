import React, { useState } from "react";
import axios from "axios";

interface UpdateProps {
    id: string | undefined;

    closeUpdate: () => void;
    _name: string;
    gender: string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string[];
    notes?: string;

}
const Update: React.FC<UpdateProps> = ({ id,_name,gender,dateOfBirth,disease,bodyParts,notes ,closeUpdate}) => {
    const updateData = async (id: string) => {
        const updateData = {
            name: _name,
            gender: gender,
            dateOfBirth: dateOfBirth,
            disease: disease,
            bodyParts: bodyParts,
            notes: notes,
        };
        try {
            await axios.put(
                `http://localhost:8080/patients/update/${id}`,
                updateData
            );
            closeUpdate();

        } catch (error) {
            console.error("Error updating data:", error);
        }
    };
    if (id){
        updateData(id);
    }

    return null;
};

export default Update;
