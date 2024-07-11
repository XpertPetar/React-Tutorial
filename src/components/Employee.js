import EditEmployee from "./EditEmployee";

function Employee(props) {
    return (
        <div className="h-[200px] w-[350px] m-3 justify-center py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img
                className="block h-24 object-cover h-[100px] w-[100px] rounded-full sm:mx-0 sm:shrink-0"
                src={props.img}
            />
            <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5 text-center">
                    <p className="text-lg text-black font-semibold">{props.name}</p>
                    <p className="text-slate-500 font-medium">{props.role ? props.role : "N/A"}</p>
                </div>
                <EditEmployee
                    id={props.id}
                    name={props.name}
                    role={props.role}
                    updateEmployee={props.updateEmployee}
                />
            </div>
        </div>
    );
}

export default Employee;
