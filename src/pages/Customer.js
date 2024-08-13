import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Error404 from "../components/Error404";
import { baseUrl, token } from "../Global";

export default function Customer() {
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const headers = {
        Authorization: "Bearer " + token
    };
    useEffect(() => {
        fetch(baseUrl + "/api/customers/" + id, { headers })
            .then((response) => {
                if (response.status === 200) {
                    setNotFound(false);
                    return response.json();
                } else if (response.status === 401) {
                    navigate("/login");
                } else if (response.status === 404) {
                    setNotFound(true);
                    setErrorMessage("Customers api is offline.");
                    throw new Error("Customers api is offline.");
                } else if (!response.status === 200) {
                    setNotFound(true);
                    setErrorMessage("Something went wrong, try again later.");
                    throw new Error("Something went wrong, try again later.");
                }
            })
            .then((data) => {
                setCustomer(data.customer);
                console.log(data.customer);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (notFound) {
        return (
            <>
                <Error404 errorMessage={errorMessage} />
                <Link to="/customerrs" className="block my-4">
                    Go back
                </Link>
            </>
        );
    }

    return (
        <>
            {customer ? (
                <div key={customer.id}>
                    <h2 className="mb-5 flex justify-center">
                        Info about
                        <span className="uppercase font-bold">&nbsp;{customer.name}</span>
                    </h2>
                    <div>
                        <p>
                            <span className="font-semibold">Id: &nbsp;</span>
                            {customer.id}
                        </p>
                        <p>
                            <span className="font-semibold">Name: &nbsp;</span>
                            {customer.name}
                        </p>
                        <p>
                            <span className="font-semibold">Industry: &nbsp;</span>
                            {customer.industry}
                        </p>
                    </div>
                    <Link to="/customers" className="block my-4">
                        Go back
                    </Link>
                </div>
            ) : null}
        </>
    );
}
