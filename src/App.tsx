import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // 추가

import Main from "./pages/Main/main"
import Create from "./components/create";

const queryClient = new QueryClient(); // 추가

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/patient" element={<Create />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
