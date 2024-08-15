import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./components/Error404";
import Login from "./pages/Login";
import { createContext, useState } from "react";

export const LoginContext = createContext();

function App() {
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
