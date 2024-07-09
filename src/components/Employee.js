function Employee(props) {
    return (
        <>
            <h2>Employee {props.name}</h2>
            {props.role ? (
                <span class="role_admin">Role: {props.role}</span>
            ) : (
                <span class="role_na">Role: N/A</span>
            )}
        </>
    );
}

export default Employee;
