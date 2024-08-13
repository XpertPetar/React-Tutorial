import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
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
                        <Route path="/customers/:id" element={<Customer />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/dictionary/:search" element={<Definition />} />
                        <Route path="/404" element={<Error404 />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </div>
    );
}

export default App;
