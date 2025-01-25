import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updatePassword,
  User, 
} from "firebase/auth";


import { auth } from "./firebase";



export const doCreateUserWithEmailAndPassword = async (email:string,password:string) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const doSignInWithEmailAndPassword = (email:string, password:string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email:string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password: string): Promise<void> => {
  const currentUser: User | null = auth.currentUser;

  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }

  try {
    await updatePassword(currentUser, password);
    console.log("Password updated successfully.");
  } catch (error) {
    console.error("Error updating password:", error);
    throw error; 
  }
};
