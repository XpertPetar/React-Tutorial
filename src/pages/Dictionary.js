import { useState, useEffect } from "react";

export default function Dictionary() {
    const [word, setWord] = useState();
    const [word2, setWord2] = useState();

    useEffect(() => {
        console.log("State updated for word: " + word);
    }, [word]);

    useEffect(() => {
        console.log("State updated for word2: " + word2);
    }, [word2]);

    return (
        <>
            <input
                className="border-2"
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />
            <div>Definition for {word}: </div>
            <input
                className="border-2"
                type="text"
                onChange={(e) => {
                    setWord2(e.target.value);
                }}
            />
            <div>Definition for {word2}: </div>
        </>
    );
}
