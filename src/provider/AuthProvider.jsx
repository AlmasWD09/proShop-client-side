
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.config";
import PropTypes from 'prop-types';




export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    // Google Login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Sign in 
    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign Out
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // LogOut
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }






    // Update userProfile
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

  
    // obserber
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        user,
        setUser,
        updateUser,
        loading,
        googleLogin,
        creatUser,
        logIn,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
// props-type validation
AuthProvider.propTypes = {
    children: PropTypes.array,
};
export default AuthProvider;