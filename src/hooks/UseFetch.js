import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useFetch(url, { method, headers, body } = {}) {
    const [data, setData] = useState();
    const [errorStatusCode, setErrorStatusCode] = useState();
    const navigate = useNavigate();
    const currentUrl = useLocation();

    function request() {
        fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: currentUrl
                        }
                    });
                } else if (!response.ok) {
                    throw response.status;
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((e) => {
                setErrorStatusCode(e);
            });
    }

    function appendData(newData) {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newData)
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate("/login", {
                        previousUrl: currentUrl
                    });
                } else if (!response.status.ok && response.status !== 201) {
                    throw response.status;
                }

                return response.json();
            })
            .then((d) => {
                const newState = { ...data };
                Object.values(newState)[0].push(Object.values(d)[0]);
                setData(newState);
            })
            .catch((e) => {
                setErrorStatusCode(e);
            });
    }

    return { request, appendData, data, errorStatusCode };
}
