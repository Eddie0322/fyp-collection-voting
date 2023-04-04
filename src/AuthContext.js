import { useContext, createContext } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    getAdditionalUserInfo,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from './FirebaseConfig';
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_USERS } from './Queries';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const [insert_user_poll, { data, loading, error }] = useMutation(MUTATION_USERS);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            if(getAdditionalUserInfo(result).isNewUser === true){
                insert_user_poll({
                    variables: {
                      id: result.user.uid, 
                      email: result.user.email, 
                      created_at: result.user.metadata.creationTime
                    },
                  });
                  console.log({ data, loading, error });
            }
        })
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
        }) 
        return () => {
            unsubscribe();
        };
    },[])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}