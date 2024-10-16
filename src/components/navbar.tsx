import { useNavigate } from "react-router-dom"

const Navbar = () => {
    let navigate = useNavigate()
    const clickLogin = () => navigate("/login")
    const clickAbout = () => navigate("/about")

    return (
        <div className="flex justify-end p-1 mr-3">
            <nav className="bg-transparent">
                <ul className="flex space-x-2">
                    <li>
                        <button className="px-4 py-2 font-medium text-gray-700
                            transition duration-300 ease-in-out bg-transparent
                            rounded-sm hover:underline hover:text-gray-900
                            focus:outline-none"
                            onClick={clickAbout}
                        >
                            About Us
                        </button>
                    </li>
                    <li>
                        <button className="px-4 py-2 font-medium text-black
                            transition duration-300 ease-in-out bg-transparent
                            rounded-sm hover:underline hover:text-gray-900
                            focus:outline-none"
                            onClick={clickAbout}
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <button className="px-4 py-2 font-medium text-white
                            transition duration-300 ease-in-out bg-green-800
                            rounded-sm hover:bg-green-600 focus:outline-none"
                            onClick={clickLogin}
                        >
                            Login
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar
