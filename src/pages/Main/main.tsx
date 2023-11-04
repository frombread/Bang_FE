import React, {useState} from 'react';

const Main: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("M");
    const [birthday, setBirthday] = useState<number>();
    const [conditions, setConditions] = useState<string>("");
    const [painAreas, setPainAreas] = useState<string[]>([]);
    const [etc, setEtc] = useState<string>("");

    return (
        <div>
            {/* JSX 내용을 여기에 작성 */}
            <h1>Main Room Component</h1>
        </div>
    );
};

export default Main;
