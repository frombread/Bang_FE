import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Remove from "./remove";
import Update from "./update";
import {useQuery} from "react-query";
import {
    BirthInput, Body, ButtonContainer, CancelButton,
    Category,
    ContentsContainer,
    MemoInput,
    NameInput,
    RegisterContainer, SaveButton,
    Select
} from "./create"; // 스타일 파일 import

interface ReadProps {
    id: string | undefined;
}
interface BodyPart {
    name: string;
}
interface Disease {
    name: string;
}
let name =""
const Read: React.FC<ReadProps> = ({ id }) => {
    const [data, setData] = useState<any>(null);
    const [del, setDel] = useState(false);
    const [upDate, setupDate] = useState(false);
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<number>(0);
    const [disease, setDisease] = useState<string>("");
    const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
    const [notes, setNotes] = useState<string>("");
    const [alertEvnet, setalertEvnet] = useState(false);

    useEffect(() => {
        const readData = async (id: string) => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/patients/read/${id}`
                );
                setData(response.data);
                setName(response.data.name);
                setGender(response.data.gender);
                setDateOfBirth(response.data.dateOfBirth);
                setDisease(response.data.disease);
                setSelectedBodyParts(response.data.bodyParts);
                setNotes(response.data.notes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            readData(id);
        }
        if(alertEvnet){
            alertEvent();
        }
    }, [id,alertEvnet]);

    const fetchBodyParts = async () => {
        const response = await fetch("http://localhost:8080/bodyparts");
        const data = await response.json();
        return data.map((part: BodyPart) => part.name);
    };

    const fetchDiseases = async () => {
        const response = await fetch("http://localhost:8080/diseases");
        const data = await response.json();
        return data.map((disease: Disease) => disease.name);
    };

    const { data: bodyPartsList = [] } = useQuery("bodyParts", fetchBodyParts);
    const { data: diseasesList = [] } = useQuery("diseases", fetchDiseases);

    const handleDelete = () => {
        console.log("handleDelete 함수 호출됨");
        setDel(true);
    };
    const handleUpdate = () => {
        setupDate(true);
    };
    const closeUpdate = () => {
        setalertEvnet(true);
        setupDate(false);
    };
    const alertEvent=()=>{
        alert("수정을 완료 했습니다.");
        setalertEvnet(false);
    }

    const handleDeleteConfirmation = (confirm: boolean) => {
        if (confirm) {
            handleDelete(); // 삭제 확정 시 handleDelete 함수 호출
        }
    };

    const handleLabelClick = (partName: string) => {
        const value = partName;
        setSelectedBodyParts((prevBodyParts) => {
            if (prevBodyParts.includes(value)) {
                return prevBodyParts.filter((part) => part !== value);
            }else{
                return [...prevBodyParts, value];

            }
        });
    };

        return (
                <>
                    <RegisterContainer>
                        <ContentsContainer>
                            <Category>이름</Category>
                            <NameInput
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Category>성별</Category>
                            <Select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="M">남성</option>
                                <option value="F">여성</option>
                            </Select>

                            <Category>생년월일</Category>
                            <BirthInput
                                id="dateOfBirth"
                                placeholder="Ex) 980606"
                                type="number"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(Number(e.target.value))}
                            />

                            <Category>기저질환</Category>
                            <Select
                                id="disease"
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)}
                            >
                                <option value="">질병을 선택하세요</option>
                                {diseasesList.map((diseaseName: string) => (
                                    <option key={diseaseName} value={diseaseName}>
                                        {diseaseName}
                                    </option>
                                ))}
                            </Select>
                            <Category>통증부위</Category>
                            <div id="bodyPartsCheckboxes">
                                {bodyPartsList.map((partName: string) => (
                                    <Body
                                        key={partName}
                                        onClick={() => handleLabelClick(partName)}
                                        style={{
                                            color: selectedBodyParts.includes(partName) ? "#00aa63" : "black",
                                            fontWeight: selectedBodyParts.includes(partName)
                                                ? "800"
                                                : "500",
                                        }}
                                    >
                                        {partName}
                                    </Body>
                                ))}
                            </div>
                            <Category>비고</Category>
                            <MemoInput
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="환자에 대한 추가적인 메모를 입력하세요."
                            />
                            <ButtonContainer>
                                <DeleteButton
                                    onClick={() => handleDeleteConfirmation(window.confirm("정말로 삭제하시겠습니까?"))}
                                >
                                    삭제
                                </DeleteButton>
                                <SaveButton onClick={() =>handleUpdate()}>수정하기</SaveButton>
                            </ButtonContainer>
                        </ContentsContainer>
                    </RegisterContainer>
                    {del && <Remove id={id} />}
                    {upDate && < Update id={id} closeUpdate={closeUpdate} _name ={name} gender ={gender} dateOfBirth={dateOfBirth} disease={disease} bodyParts={selectedBodyParts} notes={notes}/>}
                </>
        );
};
const DeleteButton = styled.div`
  cursor: pointer;
  background-color: lightgray;
  width: 150px;
  color: white;
  height: 44px;
  border-radius: 3px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "GmarketSansMedium";
`;
export default Read;
