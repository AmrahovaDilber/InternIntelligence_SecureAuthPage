import { useState } from "react";
import { useMainContext } from "../context/MainContext";
import UserContent from "../components/UserContent";
import TabButton from "../components/TabButton";

const UserPage = () => {
  const { userLoggedIn,  } = useMainContext();
  const [selectedTab, setSelectedTab] = useState<string>("");

  return (
    <div className="py-6">
      {userLoggedIn ? (
        <div>
          <p className="text-gray-600 mt-2  dark:text-gray-300 text-xl">
            Here’s what you can do next:
          </p>
          <div className="mt-4 mb-10 grid gap-4 sm:grid-cols-2">
            {["View Profil", "Task Management"].map((tab) => (
              <TabButton
                key={tab}
                setSelectedTab={setSelectedTab}
                isActive={selectedTab === tab}
              >
                {tab}
              </TabButton>
            ))}
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
