import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Error404 from "../components/Error404";
import { baseUrl, token } from "../Global";

export default function Customers() {
    const [customers, setCustomers] = useState();
    const [notFound, setNotFound] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const headers = {
        Authorization: "Bearer " + token
    };
    useEffect(() => {
        fetch(baseUrl + "/api/customers", { headers })
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
                setCustomers(data.customers);
                console.log(data.customers);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (notFound) {
        return (
            <>
                <Error404 errorMessage={errorMessage} />
            </>
        );
    }

    return (
        <>
            <h2 className="flex justify-center capitalize mb-5">Customers</h2>
            <div>
                {customers
                    ? customers.map((customer) => {
                          return (
                              <ul>
                                  <li className="list-disc">
                                      <div key={customer.id}>
                                          <Link to={"/customers/" + customer.id}>
                                              {customer.name}
                                          </Link>
                                      </div>
                                  </li>
                              </ul>
                          );
                      })
                    : null}
            </div>
        </>
    );
}
