import { useCallback, useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface UserData {
  id?: string;
  name?: string;
  email?: string;
}

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  country?: string;
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
        const data = userDocSnap.data() as UserData;
        setUserData({
          id: currentUser.uid,
          name: data.name || "User",
          email: data.email || currentUser.email || "",
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,

          country: data.country,
        });
      } else {
        setUserData({
          id: currentUser.uid,
          name: "User",
          email: currentUser.email || "",
        });
      }
    } catch (err) {
      setError("Failed to fetch user data");
      console.error(err);
    }
  }, [db]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserData();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchUserData]);

  return (
   
      <div className="w-full p-6 bg-white rounded-2xl shadow-md">
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}
        {userData ? (
          <div className="rounded-2xl py-6 px-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {userData.name}'s Profile
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
              <div className="flex items-center w-full sm:w-1/2">
                {" "}
                <div className=" font-medium text-gray-800 ">
                  Name:
                </div>
                <div className=" text-gray-600 ">
                  {userData.name}
                </div>
              </div>

               <div className="flex items-center w-full sm:w-1/2">

               <div className=" font-medium text-gray-800 ">
                Email:
              </div>
              <div className=" text-gray-600 ">
                {userData.email}
              </div>
              </div>
             
            <div className="flex items-center w-full sm:w-1/2">
            {userData.phone && (
                <>
                  <div className="font-medium text-gray-800 ">
                    Phone:
                  </div>
                  <div className=" text-gray-600 ">
                    {userData.phone}
                  </div>
                </>
              )}
              </div>
              
            <div className="flex items-center w-full sm:w-1/2">
            {userData.dateOfBirth && (
                <>
                  <div className=" font-medium text-gray-800 ">
                    Date of Birth:
                  </div>
                  <div className=" text-gray-600 ">
                    {userData.dateOfBirth}
                  </div>
                </>
              )}</div>
             
            <div className="flex items-center w-full sm:w-1/2">
            {userData.gender && (
                <>
                  <div className=" font-medium text-gray-800 ">
                    Gender:
                  </div>
                  <div className=" text-gray-600 ">
                    {userData.gender}
                  </div>
                </>
              )}</div>
             
            <div className="flex items-center w-full sm:w-1/2" >
            {userData.country && (
                <>
                  <div className=" font-medium text-gray-800 ">
                    Country:
                  </div>
                  <div className=" text-gray-600 ">
                    {userData.country}
                  </div>
                </>
              )}</div>
          
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading user data...</p>
        )}
      </div>

  );
};

export default UserProfile;
