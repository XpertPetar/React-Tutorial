import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
    const showEmloyees = true;
    const [role, setRole] = useState("Dev");
    return (
        <div className="App">
            <header className="App-header">
                {showEmloyees ? (
                    <>
                        <label for="roleInput">Input Stefan's role: </label>
                        <input
                            id="roleInput"
                            onChange={(e) => {
                                setRole(e.target.value);
                            }}
                        ></input>

                        <div class="bg-blue-300">
                            <Employee name="Petar" role="Admin" />
                            <Employee name="Stefan" role={role} />
                            <Employee name="Random" />
                        </div>
                    </>
                ) : (
                    <h1>You cannot see the employees!</h1>
                )}
            </header>
        </div>
    );
}

export default App;
