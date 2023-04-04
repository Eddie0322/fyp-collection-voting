import React from 'react';
import ReactDom from 'react-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './FirebaseConfig';
// import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
// import { useMutation } from "@apollo/client";
// import { MUTATION_USERS } from './Queries';
import { GoogleButton } from 'react-google-button'
import { UserAuth } from './AuthContext';

const LoginModal = ({openLoginModal, closeLoginModal}) => {

    // const [user] = useAuthState(auth);
    // const [email, setEmail] = React.useState('');
    // const [loginLoading, setLoginLoading] = React.useState(false)
    // const [loginError, setLoginError] = React.useState('')
    // const [infoMsg, setInfoMsg] = React.useState('');
    // const [initialLoading, setInitialLoading] = React.useState(false)
    // const [initialError, setInitialError] = React.useState('')

    const containerRef = React.useRef();
    const { user } = UserAuth();

    // React.useEffect(() => {
    //     if(user){
    //         //user has signed in
    //         return(
    //             <div>You have signed in</div>
    //         )
    //     }
    //     else{
    //         if(isSignInWithEmailLink(auth, window.location.href)){
    //             //if user clicks the email link on a different device, we will ask for email confirmation
    //             let email = localStorage.getItem('email');
    //             if(!email){
    //                 email = window.prompt('please provide your email');
    //             }
    //             //complete the loggin process
    //             setInitialLoading(true);
    //             signInWithEmailLink(auth, localStorage.getItem('email'), window.location.href)
    //             .then((result) => {
    //                 console.log(result)
    //                 localStorage.removeItem('email');
    //                 setInitialLoading(false);
    //                 setInitialError('')
    //                 if(result._tokenResponse.isNewUser === true){
    //                     insert_user_poll({
    //                         variables: {
    //                           id: result.user.uid, 
    //                           email: result.user.email, 
    //                           created_at: result.metadata.creationTime
    //                         },
    //                       });
    //                       console.log({ data, loading, error });
    //                 }
    //             }).catch((err) => {
    //                 setInitialLoading(false);
    //                 setInitialError(err.message)
    //             })
    //         }else{
    //             console.log('enter email and sign in')
    //         }
    //     }

    // },[])

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     setLoginLoading(true)
    //     sendSignInLinkToEmail(auth, email, {
    //         //the url we will redirect back to after clicking on the link inside email
    //         url: 'http://localhost:3000/',
    //         handleCodeInApp: true,
    //     }).then(() => {
    //         localStorage.setItem('email', email);
    //         setLoginLoading(false);
    //         setLoginError('');
    //         setInfoMsg('We have sent you an email with link to sign in');
    //     }).catch(err => {
    //         setLoginLoading(false);
    //         setLoginError(err.message);
    //     })

    // }

    const { googleSignIn } = UserAuth();
    const handleGoogleSignIn = async() => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }
    
    if(!openLoginModal) return null

        return (
            ReactDom.createPortal(
            <>
            <div className='modalBackground' onClick={closeLoginModal} ref={containerRef}>
                <div className='modalContent' onClick={e => { e.stopPropagation(); }}>

                    <div>Login</div>
                    <br></br>
                        {user?(
                            <span>You have logged in!</span>        
                        ):(
                            <GoogleButton onClick={handleGoogleSignIn}/>
                        )}
                        
                    <br></br>
{/*  
                    {initialLoading?(
                        <div>Loading...</div>
                    ):(
                        <>
                            {initialError!=='' ? (
                                <div>{initialError}</div>
                            ):(
                                <>
                                    {user?(
                                        <div>Please wait...</div>
                                    ):(
                                        <form onSubmit={handleLogin}>
                                            <label>Email</label>
                                            <input 
                                                type={'email'} 
                                                required placeholder='Enter email'
                                                value={email||''} onChange={(e) => setEmail(e.target.value)}
                                            ></input>
                                        
                                            <button type='submit'>
                                                {loginLoading?(
                                                    <span>Logging you in</span>
                                                ):(
                                                    <span>Login</span>
                                                )}
                                            </button>
                    
                                           
                                            {loginError!=='' && (
                                                <div>{loginError}</div>
                                            )}
                        
                                        
                                            {infoMsg!=='' && (
                                                <div>{infoMsg}</div>
                                            )}
                                        </form>)
                                    }
                                </>
                            )}
                        </>
                    )}

*/}

                </div>
            </div>
            </>
        ,
        document.getElementById('loginPortal')))
    }



export default LoginModal