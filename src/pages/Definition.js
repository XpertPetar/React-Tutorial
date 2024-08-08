import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Definition() {
    const [definition, setDefinition] = useState();
    useEffect(() => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello").then((response) =>
            response.json().then((data) => {
                console.log(data[0].meanings);
                setDefinition(data[0].meanings);
            })
        );
    }, []);

    return (
        <>
            {definition?.map((def) => {
                return (
                    <p key={uuidv4()}>
                        <span className="italic font-bold">{def.partOfSpeech}: &nbsp;</span>
                        {def.definitions[0].definition}
                    </p>
                );
            })}
        </>
    );
}
