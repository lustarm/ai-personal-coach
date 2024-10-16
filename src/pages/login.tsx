import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Footer from "../components/footer";

const Login = () => {
    // if errorMsg
    const [errorMsg, setErrorMsg] = useState('')

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const doLogin = () => {
        fetch("http://localhost:8000/v1/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.message)
                    return
                }
                setErrorMsg('')
                console.log(data.message)
                localStorage.setItem("auth", data.message)
                navigate("/talk")
            })
            .catch(error => {
                setErrorMsg('Failed to complete your request at this time please try again')
                console.log(error)
            })
    }

    return (
        <>
            <div className="flex flex-col items-center mt-10">
                <h1 className="font-semibold text-3xl text-gray-700">Welcome to AI Coach Login</h1>

                {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}

                {/* Login Form */}
                <div className="mt-8 bg-white shadow-md rounded-sm px-8 pt-6 pb-8 w-full max-w-md">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm
                                font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border
                                rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm
                                font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            {/* Login Button */}
                            <div>
                                <button
                                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={doLogin}
                                >
                                    Login
                                </button>
                            </div>

                            {/* Links for Forgot Password and Register */}
                            <div className="flex flex-col">
                                <a
                                    className="inline-block align-baseline
                                    text-sm text-green-800 hover:text-green-600"
                                    href="forgotpassword"
                                >
                                    Forgot Password?
                                </a>
                                <a
                                    className="inline-block align-baseline
                                    text-sm text-green-800 hover:text-green-600 mt-1"
                                    href="register"
                                >
                                    Not a member? Register
                                </a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="h-screen"></div>
            <Footer />
        </>
    );

}

export default Login

