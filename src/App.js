import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import Error404 from "./components/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./Global";

export const LoginContext = createContext();

function App() {
    useEffect(() => {
        function refreshTokens() {
            if (localStorage.refreshToken && localStorage.refreshToken != "undefined") {
                const url = baseUrl + "/api/token/refresh/";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        refresh: localStorage.refreshToken
                    })
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        localStorage.setItem("accessToken", data.access);
                        localStorage.setItem("refreshToken", data.refresh);
                        console.log(localStorage);
                    });
            }
        }

        refreshTokens();
        setInterval(refreshTokens, 3000 * 60);
    }, []);

    const [loggedIn, setLoggedIn] = useState(localStorage.accessToken ? true : false);

    function changeLoggedIn(value) {
        setLoggedIn(value);
        if (value == false) {
            localStorage.clear();
        }
    }

    return (
        <div className="App">
            <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
                <BrowserRouter>
                    <Header>
                        <Routes>
                            <Route path="/" element={<Employees />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/customers/:id" element={<Customer />} />
                            <Route path="/dictionary" element={<Dictionary />} />
                            <Route path="/dictionary/:search" element={<Definition />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/404" element={<Error404 />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </Header>
                </BrowserRouter>
            </LoginContext.Provider>
        </div>
    );
}

export default App;
