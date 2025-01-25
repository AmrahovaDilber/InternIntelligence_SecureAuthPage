import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../firebase/firebase";

type MainContextType = {
  exampleProperty?: string;
  currentUser: object;
  setCurrentUser?: () => void;
  userLoggedIn: boolean;
  setUserLoggedIn?: () => void;
  loading?: boolean;
};

const MainContext = createContext<MainContextType | null>(null);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = (user: object) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false)
  };

  const data: MainContextType = {
    currentUser,
    userLoggedIn
  };

  return <MainContext.Provider value={data}>{!loading && children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
