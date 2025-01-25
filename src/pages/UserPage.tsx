import { useState } from "react";
import { useMainContext } from "../context/MainContext";
import UserContent from "../components/UserContent";
import TabButton from "../components/TabButton";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { userLoggedIn } = useMainContext();
  const [selectedTab, setSelectedTab] = useState<string>("View Profil");

  return (
    <div className="py-4   ">
      {userLoggedIn ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Here’s what you can do next:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {["View Profile", "Task Management"].map((tab) => (
              <TabButton
                key={tab}
                setSelectedTab={setSelectedTab}
                isActive={selectedTab === tab}
              >
                {tab}
              </TabButton>
            ))}
          </div>

          <div className="  py-6">
            <UserContent selectedTab={selectedTab} />
          </div>
        </div>
      ) : (
        <div className="text-center flex items-center justify-center flex-col ">
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
            You need to log in to access the dashboard.
          </p>
          <Link to="/login"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            onClick={() => console.log("Redirect to login")}
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPage;
