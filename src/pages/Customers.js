import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Error404 from "../components/Error404";
import { baseUrl } from "../Global";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";

export default function Customers() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [customers, setCustomers] = useState();
    const [notFound, setNotFound] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    const currentUrl = useLocation();

    const url = baseUrl + "/api/customers";
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
                    setErrorMessage("Wrong url path or customers api is offline.");
                    throw new Error("Wrong url path or customers api is offline.");
                } else if (!response.status === 200) {
                    setNotFound(true);
                    setErrorMessage("Something went wrong, try again later.");
                    throw new Error("Something went wrong, try again later.");
                }
            })
            .then((data) => {
                setCustomers(data.customers);
                setNotFound(false);
            })
            .catch((error) => {});
    }, []);

    function addCustomer(name, industry) {
        const data = { name: name, industry: industry };
        const url = baseUrl + "/api/customers/";
        fetch(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
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
                    throw new Error("Something went wrong! Customer wasnt created.");
                }
                return response.json();
            })
            .then((data) => {
                setCustomers([...customers, data.customer]);
            })
            .catch((e) => {});
    }

    if (notFound) {
        return (
            <>
                <Error404 errorMessage={errorMessage} errorType="Page not found." />
            </>
        );
    }

    return (
        <>
            <h2 className="flex justify-center capitalize mb-5">Customers</h2>
            <div className="mb-5">
                <ul>
                    {customers
                        ? customers.map((customer) => {
                              return (
                                  <li key={customer.id} className="list-disc my-3">
                                      <div>
                                          <Link to={"/customers/" + customer.id}>
                                              {customer.name}
                                          </Link>
                                      </div>
                                  </li>
                              );
                          })
                        : null}
                </ul>
            </div>
            <AddCustomer addCustomer={addCustomer} />
        </>
    );
}
