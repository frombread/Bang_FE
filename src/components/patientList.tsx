import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Create from "./create";

interface Patient {
    _id: string;
    name: string;
    gender: string;
    dateOfBirth: number;
    disease: string;
    bodyParts: string;
    notes?: string;
}

interface PatientListProps {
    openModal: () => void;
    setSelectedPatient: (patient: Patient | null) => void;
}

const PatientList: React.FC<PatientListProps> = ({
                                                     openModal,
                                                     setSelectedPatient,
                                                 }) => {
    const [showCreate, setShowCreate] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [page, setPage] = useState(1);
    const [entirePage, setEntirePage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [Search,setSearch]=useState(false);
    const [findPageNum, setFindPageNum] = useState(1);
    // const [filteredPatients, setFilteredPatients] =useState<Patient[]>([]);

    const fetchPatients = async (pageNum:number)=>{
        try {
            const response = await axios.get(`http://localhost:8080/patients/`, {
                params: {
                    page: pageNum,
                    pageSize: 10,
                },
            });
            setPatients(response.data.data);
            setEntirePage(response.data.pageNum);
        } catch (error) {
            console.error("불러오기 실패 :", error);
            alert("불러오기 실패");
        }
    }
    const searchPatient = async (findPageNum:number, searchTerm : string)=>{
        try{
            const response = await axios.get(`http://localhost:8080/patients/byname`,{
                params:{
                    page: findPageNum,
                    pageSize:10,
                    searchTerm: searchTerm,
                },
            });
            if (searchTerm===""){
                window.location.reload();
            }else {
                setPatients(response.data.data);
                setEntirePage(response.data.pageNum);
            }
        }catch (error) {
            console.error("불러오기 실패 :", error);
            alert("불러오기 실패");
        }
    }

    useEffect(() => {
        if(!Search) {
            fetchPatients(page);
        }
    }, [page, patients]);

    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= entirePage) {
            setPage(newPage);
        }

        if(Search && newPage >= 1 && newPage <= entirePage){
            setFindPageNum(newPage);
        }
    };
    const searchButton =()=>{
        setSearch(true);
    }

    const clickCreateButton = () => {
        setShowCreate(!showCreate);
    };

    return (
        <div>
            {showCreate ? (
                <Create closeCreate={clickCreateButton} />
            ) : (
                <>
                    <Title>환자 목록</Title>
                    <Container>
                        <SearchContainer>
                            <Input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="이름으로 검색"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        searchPatient(findPageNum ,searchTerm);
                                        searchButton();
                                    }
                                }}
                            />
                            <SearchButtonContainer>
                                <SearchButton onClick={()=>{searchPatient(findPageNum ,searchTerm); searchButton();}}>검색</SearchButton>
                            </SearchButtonContainer>
                        </SearchContainer>
                        <ButtonContainer>
                            <RegisterButton onClick={clickCreateButton}>
                                환자등록
                            </RegisterButton>
                        </ButtonContainer>
                    </Container>

                    <PatientsList className="patient-list">
                        {patients.map((patient) => (
                            <List
                                key={patient._id}
                                onClick={() => {
                                    setSelectedPatient(patient);
                                    openModal();
                                }}
                            >
                                {patient.name} ({patient.dateOfBirth}) 님
                            </List>
                        ))}
                    </PatientsList>
                    <PageButtonContainer>
                        {Array.from({ length: entirePage }, (_, index) => (
                            <PageButton key={index + 1} onClick={() => changePage(index + 1)}>
                                {index + 1}
                            </PageButton>
                        ))}
                    </PageButtonContainer>
                </>
            )}
        </div>
    );
};

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  font-family: "GmarketSansMedium";
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const SearchContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 10px;
  font-family: "GmarketSansMedium";
`;

const SearchButtonContainer = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  background-color: lightgray;
`;

const SearchButton = styled.div`
  cursor: pointer;
  font-family: "GmarketSansMedium";
  font-size: 15px;
`;

const PatientsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const List = styled.li`
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: white;
  width: 700px;
  height: 45px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-family: "GmarketSansMedium";
`;

const PageButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.div`
  cursor: pointer;
  margin-left: 30px;
  font-weight: 700;
  font-size: 20px;
`;

const RegisterButton = styled.div`
  cursor: pointer;
  background-color: #00aa63;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 3px;
  font-family: "GmarketSansMedium";
`;

const ButtonContainer = styled.div`
  height: 40px;
  width: 100px;
  display: flex;
`;

export default PatientList;
