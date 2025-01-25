import { useState } from "react";
import { useMainContext } from "../context/MainContext";
import UserContent from "../components/UserContent";

const UserPage = () => {
  const { userLoggedIn, user } = useMainContext();
  const [selectedTab, setSelectedTab] = useState<string>("");

  return (
    <div className="py-6">
      {userLoggedIn ? (
        <div>
          <p className="text-gray-600 mt-2  dark:text-gray-300 text-xl">
            Here’s what you can do next:
          </p>
          <div className="mt-4 mb-10 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setSelectedTab("View Profile")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              View Profile
            </button>

            <button
              onClick={() => setSelectedTab("Task Management")}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Task Management
            </button>
          </div>
          <UserContent selectedTab={selectedTab}></UserContent>
        </div>
      ) : (
        <p>You need to log in to access the dashboard.</p>
      )}
    </div>
  );
};

export default UserPage;
