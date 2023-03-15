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
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscriber;
  }, []);

  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            navigate("/verify-email");
          })
          .catch((err) => alert(err.message));
      })
      .catch((error) => {
        throw error;
      });
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = async () => {
    return signOut(auth)
      .then(() => {
        //
      })
      .catch((error) => {
        throw error;
      });
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        //
      })
      .catch((error) => {
        throw error;
      });
  };

  const updateEmail_ = async (email) => {
    return updateEmail(auth.currentUser, email)
      .then(() => {
        //
      })
      .catch((error) => {
        throw error;
      });
  };

  const updatePassword_ = async (password) => {
    return updatePassword(auth.currentUser, password)
      .then(() => {
        //
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then((result) => {
        //
      })
      .catch((error) => {
        throw error;
      });
  };

  const resendEmailVerification = async () => {
    return sendEmailVerification(auth.currentUser)
      .then(() => {
        const timeout = setTimeout(() => {
          navigate("../login");
        }, 5000);

        return () => {
          clearTimeout(timeout);
        };
      })
      .catch((error) => {
        throw error;
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
    resendEmailVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
