import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Error from "../components/Error";
import { baseUrl } from "../Global";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";

export default function Customers() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();
    const currentUrl = useLocation();

    const url = baseUrl + "/api/customers/";
    const {
        request,
        appendData,
        data: { customers } = {},
        errorStatusCode
    } = useFetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json"
        }
    });

    useEffect(() => {
        request();
    }, []);

    function addCustomer(name, industry) {
        appendData({ name: name, industry: industry });
    }

    if (errorStatusCode !== undefined && errorStatusCode === 404) {
        return (
            <>
                <Error
                    errorStatusCode={errorStatusCode}
                    errorMessage="Wrong url path or customers api is offline."
                />
            </>
        );
    } else if (errorStatusCode >= 500 && errorStatusCode < 600 && errorStatusCode !== undefined) {
        return (
            <>
                <Error
                    statusCode={errorStatusCode}
                    errorMessage="Try again later."
                    errorType="Server side error."
                />
            </>
        );
    } else if (errorStatusCode !== undefined && errorStatusCode !== 200) {
        return (
            <>
                <Error
                    errorStatusCode={errorStatusCode}
                    errorMessage="Something went wrong, try again later."
                />
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
