import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./components/Dictionary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/" element={<Employees />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </div>
    );
}

export default App;
