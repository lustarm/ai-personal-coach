const Navbar = () => {
    return (
        <div className="flex justify-end p-1">
            <nav className="bg-transparent">
                <ul className="flex space-x-6">
                    <li>
                        <button className="px-4 py-2 font-medium text-gray-700 transition duration-300 ease-in-out bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none">
                            About
                        </button>
                    </li>
                    <li>
                        <button className="px-4 py-2 font-medium text-white transition duration-300 ease-in-out bg-green-800 rounded-sm hover:bg-green-600 focus:outline-none">
                            Login
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar
