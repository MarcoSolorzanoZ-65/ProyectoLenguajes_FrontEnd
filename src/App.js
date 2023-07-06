import { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login/login";
import 'react-toastify/dist/ReactToastify.min.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { Navigate } from 'react-router-dom';

function Protected({isLoggedIn, children}) {
    return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {isLoggedIn && <Sidebar isSidebar={isSidebar} />}
                    <main className="content">
                        {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />}
                        <Routes>
                            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/dashboard" element={<Protected isLoggedIn={isLoggedIn}><Dashboard /></Protected>} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;