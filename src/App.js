import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./components/Error404";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/" element={<Employees />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/definition/:search" element={<Definition />} />
                        <Route path="/404" element={<Error404 />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </div>
    );
}

export default App;
