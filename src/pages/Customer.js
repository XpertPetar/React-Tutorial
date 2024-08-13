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

    const url = baseUrl + "/api/customers/" + id;
    const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
    };
    useEffect(() => {
        fetch(url, { headers })
            .then((response) => {
                if (response.status === 200) {
                    setNotFound(false);
                    return response.json();
                } else if (response.status === 401) {
                    navigate("/login");
                } else if (response.status === 404) {
                    setNotFound(true);
                    setErrorMessage("Wrong url path or customers api is offline.");
                    throw new Error("Wrong url path or customers api is offline.");
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
                <Link to="/customers" className="block my-4">
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
                    <button
                        onClick={(e) => {
                            const url = baseUrl + "/api/customers/" + id;
                            fetch(url, { headers, method: "DELETE" })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(
                                            "Something went wrong! Customer wasnt deleted."
                                        );
                                    }
                                    navigate("/customers");
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                        className="shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            ) : null}
            <Link to="/customers" className="block my-5">
                Go back
            </Link>
        </>
    );
}
