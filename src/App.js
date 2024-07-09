import "./App.css";
import Employee from "./components/Employee";

function App() {
    const showEmloyees = true;
    return (
        <div className="App">
            <header className="App-header">
                {showEmloyees ? (
                    <>
                        <Employee />
                        <Employee />
                        <Employee />
                    </>
                ) : (
                    <h1>You cannot see the employees!</h1>
                )}
            </header>
        </div>
    );
}

export default App;
