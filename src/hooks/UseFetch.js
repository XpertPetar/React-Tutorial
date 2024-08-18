import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useFetch(url, method, headers, body) {
    const [data, setData] = useState();
    const [errorStatusCode, setErrorStatusCode] = useState();
    const navigate = useNavigate();
    const currentUrl = useLocation();

    useEffect(() => {
        fetch(url)
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
    }, []);

    return [data, errorStatusCode];
}
