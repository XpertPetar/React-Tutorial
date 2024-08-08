import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DictionarySearchBar() {
    const [word, setWord] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("State updated for word: " + word);
    }, [word]);

    return (
        <form
            onSubmit={() => {
                navigate("/dictionary/" + word);
            }}
            className="flex justify-center w-full"
        >
            <input
                autoFocus
                placeholder="Cat"
                className="border-2 border-gray-300 rounded w-3/4 px-2 py-1 shrink min-w-0"
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />
            <button
                className="mx-2 shadow bg-purple-600 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
            >
                Search
            </button>
        </form>
    );
}
