import React from "react";
import axios from "axios";


interface ReadProps{
    name: string;
    gender:string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string;
    notes?:string;
}
const Read:React.FC<ReadProps> =(props)=> {

    return(
        <h1>hi</h1>
    )
}
export default Read;