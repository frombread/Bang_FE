import React, {useEffect, useState} from "react";
import axios from "axios";
import {useQuery} from "react-query";

interface BodyPart {
    name: string;
}
interface Disease {
    name: string;
}
interface UpdateProps {
    id: string | undefined;

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
const Update: React.FC<UpdateProps> = ({ id,patientData }) => {
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

    const fetchDate = async (id: string) => {
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
            console.log(response.data);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return null;
}
export default Update;