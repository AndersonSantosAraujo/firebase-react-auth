import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser();
        setLoading(false);
      }
    });

    return unsubscriber;
  }, []);

  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const login = async (email, password) => {
    const signin = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const logout = async () => {
    return signOut(auth)
      .then(() => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const updateEmail_ = async (email) => {
    return updateEmail(auth.currentUser, email)
      .then(() => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const updatePassword_ = async (password) => {
    return updatePassword(auth.currentUser, password)
      .then(() => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then((result) => {
        //
      })
      .catch((error) => {
        console.log("Error: ", error.code, " - ", error.message);
      });
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail_,
    updatePassword_,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
