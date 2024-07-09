import "./App.css";
import Employee from "./components/Employee";

function App() {
    const showEmloyees = true;
    return (
        <div className="App">
            <header className="App-header">
                {showEmloyees ? (
                    <>
                        <Employee name="Petar" role="Admin" />
                        <Employee name="Stefan" />
                        <Employee name="Random" />
                    </>
                ) : (
                    <h1>You cannot see the employees!</h1>
                )}
            </header>
        </div>
    );
}

export default App;
