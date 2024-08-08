import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
    const [word, setWord] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("State updated for word: " + word);
    }, [word]);

    return (
        <>
            <h2 className="flex justify-center mb-4 capitalize">Search for a word</h2>
            <div className="flex w-full justify-center">
                <input
                    className="border-2 border-gray-300 rounded w-3/4 px-2 py-1"
                    type="text"
                    onChange={(e) => {
                        setWord(e.target.value);
                    }}
                />
                <button
                    className="mx-2 shadow bg-purple-600 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        navigate("/definition/" + word);
                    }}
                >
                    Search
                </button>
            </div>
        </>
    );
}
