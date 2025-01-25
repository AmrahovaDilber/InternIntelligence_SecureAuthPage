import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../firebase/firebase";

type LoginFormData = {
  email: string;
  password: string;
};

type MainContextType = {
  currentUser: User | null;
  userLoggedIn: boolean;
  setUserLoggedIn: (loggedIn: boolean) => void;
  loginFormData: LoginFormData;
  setLoginFormData: (
    data: LoginFormData | ((prev: LoginFormData) => LoginFormData)
  ) => void;
  userInfo: {
    name?: string;
    email?: string;
    password?: string;
    checked?: string;
  };
  setUserInfo: (userInfo: object) => void;
};

const MainContext = createContext<MainContextType | null>(null);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);
        
        // Optionally, fetch additional user info if needed
        const userInfo = {
          name: user.displayName || '',
          email: user.email || '',
        };
        setUserInfo(userInfo);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setUserInfo({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const data: MainContextType = {
    currentUser,
    userLoggedIn,
    setUserLoggedIn,
    loginFormData,
    setLoginFormData,
    userInfo,
    setUserInfo,
  };

  return (
    <MainContext.Provider value={data}>
      {!loading && children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
