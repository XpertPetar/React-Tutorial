import { useState, useContext } from "react";
import { baseUrl } from "../Global";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LoginContext } from "../App";
import Error404 from "../components/Error";

export default function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    function register(e) {
        e.preventDefault();

        const url = baseUrl + "/api/register/";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then((response) => {
                // if (response.status === 401) {
                //     setError(true);
                //     setErrorMessage("Wrong credentials!");
                //     throw new Error("Wrong credentials!");
                // } else if (!response.status.ok) {
                //     setError(true);
                //     setErrorMessage("Something went wrong, please try again later.");
                //     throw new Error("Something went wrong, please try again later.");
                // }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                if (localStorage.getItem("accessToken") != "undefined") {
                    setLoggedIn(true);
                    navigate(location?.state?.previousUrl ? location.state.previousUrl : "/");
                } else {
                    setError(true);
                    setErrorMessage("Wrong credentials!");
                    throw new Error("Wrong credentials!");
                }
            })
            .catch((e) => {});
    }

    return (
        <>
            <section className="mt-32">
                <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                action="#"
                                onSubmit={(e) => {
                                    register(e);
                                }}
                            >
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        value={username ? username : ""}
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Joe Biden"
                                        required=""
                                        autoFocus
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        value={email ? email : ""}
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="joe.biden@gmail.com"
                                        required=""
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        value={password ? password : ""}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            ></input>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-purple-600 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-500 dark:focus:ring-purple-800"
                                >
                                    Register
                                </button>
                            </form>
                            {error ? (
                                <Error404
                                    errorMessage={errorMessage}
                                    errorType="Bad credentials error."
                                ></Error404>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
