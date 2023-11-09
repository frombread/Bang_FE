import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

interface BodyPart {
    name: string;
}

interface Disease {
    name: string;
}
interface propsCreate {
    closeCreate: () => void;
}

const Create: React.FC<propsCreate> = ({ closeCreate }) => {
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("M");
    const [dateOfBirth, setDateOfBirth] = useState<number>();
    const [disease, setDisease] = useState<string>("");
    const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
    const [notes, setNotes] = useState<string>("");

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

    const createData = async () => {
        try {
            if (!name || !gender || !dateOfBirth || !disease || selectedBodyParts.length === 0) {
                alert("비어 있는 항목이 있습니다!");
                return;
            }
            if (!dateOfBirth || !/^\d{6}$/.test(dateOfBirth.toString())) {
                alert("유효한 생년월일을 입력하세요! (6자리 숫자).");
                return;
            }
            const year = parseInt(dateOfBirth.toString().substring(0, 2));
            const month = parseInt(dateOfBirth.toString().substring(2, 4));
            const day = parseInt(dateOfBirth.toString().substring(4, 6));

            if (year < 0 || year > 99 || month < 1 || month > 12 || day < 1 || day > 31) {
                alert("올바른 생년월일을 입력하세요.");
                return;
            }

            if (selectedBodyParts.length === 0) {
                alert("적어도 한 개 이상의 body part를 선택하세요.");
                return;
            }
            const bodyParts = selectedBodyParts;
            await axios.post(
                `http://localhost:8080/patients/create`,
                {
                    name,
                    gender,
                    dateOfBirth,
                    disease,
                    bodyParts,
                    notes,
                }
            );
            window.location.reload();
        } catch (error) {
            console.error("저장 실패 :", error);
            alert("저장 실패");
        }
    };

    const handleLabelClick = (partName: string) => {
        if (selectedBodyParts.includes(partName)) {
            setSelectedBodyParts(
                selectedBodyParts.filter((part) => part !== partName)
            );
        } else {
            setSelectedBodyParts([...selectedBodyParts, partName]);
        }
    };

    return (
        <>
            <RegisterContainer>
                <Title>환자를 등록해주세요!</Title>
                <ContentsContainer>
                    <Category>이름</Category>
                    <NameInput
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="환자의 이름을 입력하세요"
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
                    <MemoCategory>비고</MemoCategory>
                    <MemoInput
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="환자에 대한 추가적인 메모를 입력하세요."
                    />
                    <ButtonContainer>
                        <CancelButton onClick={closeCreate}>나가기</CancelButton>
                        <SaveButton onClick={createData}>등록하기</SaveButton>
                    </ButtonContainer>
                </ContentsContainer>
            </RegisterContainer>
        </>
    );
};

export const RegisterContainer = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 500px;
  margin-top: 30px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  padding: 40px 0px 0px 30px;
  font-family: "GmarketSansMedium";
`;

export const Category = styled.div`
  font-weight: 600;
  font-size: 17px;
  font-family: "GmarketSansMedium";
`;
export const ContentsContainer = styled.div`
  padding: 40px;
`;

export const NameInput = styled.input`
  width: 400px;
  height: 40px;
  margin: 10px 0px 10px 0px;
  padding-left: 5px;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-family: "GmarketSansMedium";
`;

export const Select = styled.select`
  width: 400px;
  height: 40px;
  margin: 10px 0px 10px 0px;
  padding-left: 5px;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-family: "GmarketSansMedium";
`;

export const BirthInput = styled.input`
  width: 400px;
  height: 40px;
  margin: 10px 0px 10px 0px;
  padding-left: 5px;
  border: 1px solid lightgray;
  border-radius: 3px;
  font-family: "GmarketSansMedium";
`;

export const Body = styled.span`
  cursor: pointer;
  margin-right: 10px;
  font-family: "GmarketSansMedium";
`;

const MemoCategory = styled.div`
  margin-top: 10px;
  font-weight: 600;
  font-size: 17px;
  font-family: "GmarketSansMedium";
`;

export const MemoInput = styled.input`
  width: 400px;
  height: 70px;
  margin: 10px 0px 10px 0px;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 5px;
  font-family: "GmarketSansMedium";
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 15px;
  padding-right: 10px;
`;

export const SaveButton = styled.div`
  cursor: pointer;
  background-color: #00aa63;
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

export const CancelButton = styled.div`
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
export default Create;
