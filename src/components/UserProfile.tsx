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
          name: data.name || currentUser.displayName || 'User',
          email: data.email || currentUser.email || '',
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          address: data.address,
          country: data.country
        });
      } else {
        setUserData({
          id: currentUser.uid,
          name: currentUser.displayName || 'User',
          email: currentUser.email || ''
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md">
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}
        {userData ? (
          <div className="max-w-4xl mx-auto  rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {userData.name}'s Profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="font-medium text-gray-800">Name:</div>
            <div className="text-gray-600">{userData.name}</div>
        
            <div className="font-medium text-gray-800">Email:</div>
            <div className="text-gray-600">{userData.email}</div>
        
            {userData.phone && (
              <>
                <div className="font-medium text-gray-800">Phone:</div>
                <div className="text-gray-600">{userData.phone}</div>
              </>
            )}
        
            {userData.dateOfBirth && (
              <>
                <div className="font-medium text-gray-800">Date of Birth:</div>
                <div className="text-gray-600">{userData.dateOfBirth}</div>
              </>
            )}
        
            {userData.gender && (
              <>
                <div className="font-medium text-gray-800">Gender:</div>
                <div className="text-gray-600">{userData.gender}</div>
              </>
            )}
        
            {userData.address && (
              <>
                <div className="font-medium text-gray-800">Address:</div>
                <div className="text-gray-600">{userData.address}</div>
              </>
            )}
        
            {userData.country && (
              <>
                <div className="font-medium text-gray-800">Country:</div>
                <div className="text-gray-600">{userData.country}</div>
              </>
            )}
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