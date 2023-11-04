import React, {useEffect, useState} from 'react';
import axios from "axios";

const Create:React.FC =()=> {

    const create =async ()=> {
        try {
            const response = await axios.post(
                `localhost:5000/patient/create`, {
                    name, gender, birthday, conditions, painAreas, etc
                }
            );
            console.log(response.data);
        }catch(error){
            console.error("저장 실패 :", error);
            alert("저장 실패")
        }
    }

    return(
        <div>
            <h1>his</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="M">남성</option>
                <option value="F">여성</option>
            </select>
            <input type="number" value={birthday} onChange={(e)=>setBirthday(Number(e.target.value))}/>
            <input type="text" value={conditions} onChange={(e)=>setConditions(e.target.value)}/>
            <input type="text" value={painAreas.join(",")} onChange={(e)=>setPainAreas((prevPainAreas) => [...prevPainAreas, e.target.value])}/>
            <input type="text" value={etc} onChange={(e)=>setConditions(e.target.value)}/>
            <button onClick={create}>저장!</button>
        </div>
    )
}
export default Create;