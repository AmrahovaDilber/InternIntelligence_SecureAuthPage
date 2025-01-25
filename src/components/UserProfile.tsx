import { useCallback, useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}
const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const [error, setError] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  const fetchUserData = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("No authenticated user found");
        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        setError("No user data found");
      }
    } catch (err) {
      setError("Failed to fetch user data");
      console.error(err);
    }
  }, [auth.currentUser, db]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}
        {userData ? (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {userData.name}'s Profile
            </h1>
            <div className="space-y-2">
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-800">Email:</span>{" "}
                {userData.email}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-800">Name:</span>{" "}
                {userData.name}
              </p>
              <p>
                <span className="font-medium text-gray-800">Password:</span>{" "}
                {userData.password}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
