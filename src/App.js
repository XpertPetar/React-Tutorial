import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
    const showEmloyees = true;

    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "Petar",
            role: "Admin",
            img: "https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            name: "Stefan",
            role: "Dev",
            img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 3,
            name: "Random",
            role: "",
            img: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        },
        {
            id: 4,
            name: "Baci",
            role: "Bot",
            img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 5,
            name: "Random",
            role: "",
            img: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        },
        {
            id: 6,
            name: "Zoki",
            role: "Dev",
            img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 7,
            name: "Bazo",
            role: "Tester",
            img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 8,
            name: "Random",
            role: "",
            img: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        }
    ]);

    function updateEmployee(id, newName, newRole) {
        const updatedEmployees = employees.map((employee) => {
            if (employee.id == id) {
                return { ...employee, name: newName, role: newRole };
            } else return employee;
        });

        setEmployees(updatedEmployees);
    }

    return (
        <div className="App">
            <header className="App-header">
                {showEmloyees ? (
                    <>
                        <div className="p-5 flex flex-wrap gap-2 justify-center">
                            {employees.map((employee) => {
                                return (
                                    <Employee
                                        key={employee.id}
                                        id={employee.id}
                                        name={employee.name}
                                        role={employee.role}
                                        img={employee.img}
                                        alt="Employee Image"
                                        updateEmployee={updateEmployee}
                                    ></Employee>
                                );
                            })}
                        </div>

                        <div className="flex justify-center mt-5">
                            <button className="bg-transparent w-60 h-16 p-1 border rounded text-lg font-bold text-blue-500">
                                + New Employee
                            </button>
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
