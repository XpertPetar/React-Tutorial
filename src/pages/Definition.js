import { v4 as uuidv4 } from "uuid";
import { useParams, Link } from "react-router-dom";
import Error from "../components/Error";
import DictionarySearchBar from "../components/DictionarySearchBar";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
    let { search } = useParams();
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
    const [definition, errorStatusCode] = useFetch(url);

    if (errorStatusCode === 404 && errorStatusCode !== undefined) {
        return (
            <>
                <Error
                    statusCode={errorStatusCode}
                    errorMessage="Word doesn't have a definition."
                    errorType="Page not found."
                />
                <Link to="/dictionary" className="inline-block">
                    ← Search another word
                </Link>
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
                <Link to="/dictionary" className="inline-block">
                    ← Search another word
                </Link>
            </>
        );
    } else if (errorStatusCode !== 200 && errorStatusCode !== undefined) {
        console.log(errorStatusCode);
        return (
            <>
                <Error statusCode={errorStatusCode} errorMessage="Unknown error occured." />
                <Link to="/dictionary" className="inline-block">
                    ← Search another word
                </Link>
            </>
        );
    }

    return (
        <>
            {definition?.[0]?.meanings ? (
                <div className="mb-5">
                    <h2 className="flex justify-center mb-4">
                        Here is a definition for
                        <span className="font-bold uppercase">&nbsp;{search}</span>
                    </h2>
                    {definition[0].meanings.map((def) => {
                        return (
                            <p key={uuidv4()}>
                                <span className="italic font-bold">{def.partOfSpeech}: &nbsp;</span>
                                {def.definitions[0].definition}
                            </p>
                        );
                    })}
                </div>
            ) : null}
            <div>
                <h5 className="flex justify-center">Search again:</h5>
                <DictionarySearchBar />
            </div>
        </>
    );
}
