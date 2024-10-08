import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Error from "../components/Error";
import { baseUrl } from "../Global";
import { LoginContext } from "../App";

export default function Customer() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [changed, setChanged] = useState(false);
    const [notFound, setNotFound] = useState();
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorStatusCode, setErrorStatusCode] = useState();
    const navigate = useNavigate();
    const currentUrl = useLocation().pathname;
    const { id } = useParams();

    useEffect(() => {
        if (!customer || !tempCustomer) return;

        if (customer.name === tempCustomer.name && customer.industry === tempCustomer.industry) {
            setChanged(false);
        }

        if (localStorage.getItem("accessToken") == "undefined") {
            setLoggedIn(false);
        }
    });

    const url = baseUrl + "/api/customers/" + id + "/";
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json"
    };
    useEffect(() => {
        fetch(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setNotFound(false);
                    return response.json();
                } else if (response.status === 401) {
                    setLoggedIn(false);
                    navigate("/login", {
                        state: {
                            previousUrl: currentUrl
                        }
                    });
                } else if (response.status === 404) {
                    setNotFound(true);
                    setErrorStatusCode(response.status);
                    setErrorMessage("The customer with id " + id + " was not found.");
                    throw new Error("The customer with id " + id + " was not found.");
                } else if (!response.status === 200) {
                    setNotFound(true);
                    setErrorStatusCode(response.status);
                    setErrorMessage("Something went wrong, try again later.");
                    throw new Error("Something went wrong, try again later.");
                }
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function updateCustomer(e) {
        e.preventDefault();

        fetch(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                if (response.status === 401) {
                    setLoggedIn(false);
                    navigate("/login", {
                        state: {
                            previousUrl: currentUrl
                        }
                    });
                } else if (!response.ok) {
                    setError(true);
                    setErrorMessage("Something went wrong while updating.");
                    throw new Error("Something went wrong while updating.");
                }
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer);
                setChanged(false);
                setError(false);
            })
            .catch((e) => {});
    }

    if (notFound) {
        return (
            <>
                <Error
                    errorStatusCode={errorStatusCode}
                    errorMessage={errorMessage}
                    errorType="Server side error"
                />
                <Link to="/customers" className="block my-4 inline-block">
                    ← Go back
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
                        <form
                            id="customerForm"
                            onSubmit={updateCustomer}
                            className="space-y-4 mb-3"
                        >
                            <div className="flex items-center space-x-4">
                                <label htmlFor="id" className="font-semibold w-24">
                                    Id:
                                </label>
                                <input
                                    id="id"
                                    value={tempCustomer.id}
                                    disabled
                                    className="border-2 border-gray-300 rounded px-3 py-1 w-60"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <label htmlFor="name" className="font-semibold w-24">
                                    Name:
                                </label>
                                <input
                                    id="name"
                                    value={tempCustomer.name}
                                    onChange={(e) => {
                                        setTempCustomer({ ...tempCustomer, name: e.target.value });
                                        setChanged(true);
                                    }}
                                    className="border-2 border-gray-300 rounded px-3 py-1 w-60"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <label htmlFor="industry" className="font-semibold w-24">
                                    Industry:
                                </label>
                                <input
                                    id="industry"
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setTempCustomer({
                                            ...tempCustomer,
                                            industry: e.target.value
                                        });
                                        setChanged(true);
                                    }}
                                    className="border-2 border-gray-300 rounded px-3 py-1 w-60"
                                />
                            </div>
                        </form>
                    </div>
                    {changed ? (
                        <div>
                            <button
                                className="shadow bg-yellow-600 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 my-2 rounded"
                                onClick={(e) => {
                                    setTempCustomer(customer);
                                    setChanged(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 mx-3 my-2 rounded"
                                form="customerForm"
                            >
                                Save
                            </button>
                        </div>
                    ) : null}
                    <button
                        onClick={(e) => {
                            const url = baseUrl + "/api/customers/" + id;
                            fetch(url, { headers, method: "DELETE" })
                                .then((response) => {
                                    if (response.status === 401) {
                                        setLoggedIn(false);
                                        navigate("/login", {
                                            state: {
                                                previousUrl: currentUrl
                                            }
                                        });
                                        throw new Error(
                                            "Something went wrong! Customer wasnt deleted."
                                        );
                                    }
                                    if (!response.ok) {
                                        throw new Error(
                                            "Something went wrong! Customer wasnt deleted."
                                        );
                                    }
                                    navigate("/customers");
                                })
                                .catch((error) => {});
                        }}
                        className="shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 my-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            ) : null}
            {error ? (
                <Error errorMessage={errorMessage} errorType="Server side error"></Error>
            ) : null}
            <Link to="/customers" className="block my-5 inline-block">
                ← Go back
            </Link>
        </>
    );
}
