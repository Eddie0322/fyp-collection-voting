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
import { useMutation, useSubscription } from "@apollo/client";
import { MUTATION_USERS, SUBSCRIPTION_USER_VOTE } from './Queries';



const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({uid: "Gpu5FDbwoVTlEaOeJZwrAeLgRkT2"})
    //const [userVotes, setUserVotes] = useState()
    const [uid, setUid] = useState('')
    const [insert_user_poll, { data, loading, error }] = useMutation(MUTATION_USERS);
    const [userVotes, setUserVotes] = useState([])

    const { data: user_votes_data, 
        loading: database_loading } = useSubscription(SUBSCRIPTION_USER_VOTE,
            { variables: { id: uid },
              shouldResubscribe: true })

    useEffect(() => {
        if(user){
            setUid(user.uid)
        }else{
            setUid('')
        }
    },[user])


    useEffect(() => {
        if(user_votes_data && user_votes_data.user.length !== 0){
            setUserVotes(user_votes_data.user[0].votes.map(a => a.collection_poll_id));
        }else{
            setUserVotes([])
        }
    },[user_votes_data])
    //console.log(userVotes)

    
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
        <AuthContext.Provider value={{googleSignIn, logOut, user, userVotes, database_loading, user_votes_data}}>
            {children}
        </AuthContext.Provider>
    )
}


export const UserAuth = () => {
    return useContext(AuthContext)
}