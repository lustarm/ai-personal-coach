// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab } : {activeTab: string, setActiveTab: any}) => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
            <h2 className="text-xl font-bold p-4">AI Coach Dashboard</h2>
            <nav className="flex-grow">
                <ul>
                    <li
                        className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === "Talk" ? "bg-gray-700" : ""
                            }`}
                        onClick={() => setActiveTab("Talk")}
                    >
                        Talk to a Coach
                    </li>
                    <li
                        className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === "Account" ? "bg-gray-700" : ""
                            }`}
                        onClick={() => setActiveTab("Account")}
                    >
                        Account
                    </li>
                    <li
                        className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === "Settings" ? "bg-gray-700" : ""
                            }`}
                        onClick={() => setActiveTab("Settings")}
                    >
                        Settings
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar
