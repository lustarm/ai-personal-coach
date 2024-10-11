import { useState } from "react";

import Sidebar from "../components/sidebar"

// Main Content Component
const MainContent = ({ activeTab }: { activeTab: string }) => {
    return (
        <div className="p-8 flex-grow">
            {activeTab === "Talk" && (
                <div>
                    <h2 className="text-2xl font-semibold">Talk to a Coach</h2>
                    <p>Start your conversation with an AI coach here.</p>
                    {/* Include your Talk component here */}
                </div>
            )}
            {activeTab === "Account" && (
                <div>
                    <h2 className="text-2xl font-semibold">Account Information</h2>
                    <p>Manage your account details and preferences.</p>
                </div>
            )}
            {activeTab === "Settings" && (
                <div>
                    <h2 className="text-2xl font-semibold">Settings</h2>
                    <p>Update your app settings and preferences here.</p>
                </div>
            )}
        </div>
    );
};

// Dashboard Component
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("Talk");

    return (
        <div className="flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <MainContent activeTab={activeTab} />
        </div>
    );
};

const Talk = () => {
    return (<Dashboard />)
}

export default Talk
