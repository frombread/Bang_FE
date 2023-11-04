import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./pages/Main/main"
import Create from "./components/create";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/patient" element={<Create />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
