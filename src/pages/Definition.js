import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate, Link } from "react-router-dom";
import Error404 from "../components/Error404";
import DictionarySearchBar from "../components/DictionarySearchBar";

export default function Definition() {
    let { search } = useParams();
    const [definition, setDefinition] = useState();
    const [notFound, setNotFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
        //const url = "https://httpstat.us/500"; // Testing error codes url
        setNotFound(false);

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    setNotFound(false);
                    return response.json();
                } else if (response.status === 404) {
                    setNotFound(true);
                    setErrorMessage("Word doesn't have a definition.");
                    throw new Error("Word doesn't have a definition.");
                } else if (response.status >= 500 && response.status < 600) {
                    setNotFound(true);
                    setErrorMessage("Server side error. We are sorry.");
                    throw new Error("Server side error. We are sorry.");
                } else if (!response.ok) {
                    setNotFound(true);
                    setErrorMessage("Unknown error occured.");
                    throw new Error("Unknown error occured.");
                }
            })
            .then((data) => {
                setDefinition(data[0].meanings);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (notFound) {
        return (
            <>
                <Error404 errorMessage={errorMessage} />
                <Link to="/dictionary" className="inline-block">
                    Search another word
                </Link>
            </>
        );
    }

    return (
        <>
            {definition ? (
                <>
                    <h2 className="flex justify-center mb-4">
                        Here is a definition for
                        <span className="font-bold uppercase">&nbsp;{search}</span>
                    </h2>
                    {definition.map((def) => {
                        return (
                            <p key={uuidv4()}>
                                <span className="italic font-bold">{def.partOfSpeech}: &nbsp;</span>
                                {def.definitions[0].definition}
                            </p>
                        );
                    })}
                </>
            ) : null}
            <div className="my-4">
                <h5 className="flex justify-center">Search again:</h5>
                <DictionarySearchBar />
            </div>
        </>
    );
}
