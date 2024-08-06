import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header>
                <Routes>
                    <Route path="/" element={<Employees />} />
                    <Route path="/customers" element={<Customers />} />
                </Routes>
            </Header>
        </BrowserRouter>
    );
}

export default App;
