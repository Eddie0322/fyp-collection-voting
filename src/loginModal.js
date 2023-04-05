import React from 'react';
import ReactDom from 'react-dom';
import { GoogleButton } from 'react-google-button'
import { UserAuth } from './AuthContext';
import crossSVG from "./assets/cross.svg";
import { motion, AnimatePresence } from "framer-motion"

const LoginModal = ({openLoginModal, closeLoginModal}) => {

    const containerRef = React.useRef();
    const { user, database_loading } = UserAuth();

    const { googleSignIn } = UserAuth();
    const handleGoogleSignIn = async() => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }
    
    // if(!openLoginModal) return null

        return (
            ReactDom.createPortal(
            <AnimatePresence mode='wait'>

            {openLoginModal && (

            <>
            <motion.div 
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.2
                        }
                    }}
                    exit={{
                        opacity: 0
                    }}               
                    className='modalBackground' 
                    onClick={closeLoginModal} 
                    ref={containerRef}
                >
                        
                <div 
                    className='loginModalContent' 
                    onClick={e => { e.stopPropagation(); }}
                >

                    <motion.div 
                        initial={{
                            scale: 0
                        }}
                        animate={{
                            scale: 1,
                            transition: {
                                delay: 0.2,
                                duration: 0.2
                            }
                        }}         
                        className='HeaderRow'
                    >
                    <img style={{ width: "24px", cursor: "pointer" }} src={crossSVG} alt="" onClick={closeLoginModal}></img> 
                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 50
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.2,
                                duration: 0.4
                            }
                        }}                 
                    >
                        <div className='loginTitle'>Welcome to Art Emotions ~</div>
                        <div className='loginSubTitle'>Vote for your emotions on ARTIC collections with your Google account</div>
                    </motion.div>
                   
                    <br></br>
                        {user?(
                            <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 1,
                                    duration: 1
                                }
                            }}  >
                                
                                {database_loading?(
                                     <>
                                    <br></br>
                                    <div className='loginTitle' style={{ fontSize: "16px", color: "rgba(255, 229, 180)" }}>Loading...</div>
                                    </> 
                                ):(
                                   <>
                                     <br></br>
                                     <div className='loginTitle' style={{ fontSize: "16px", color: "rgba(255, 229, 180)" }}>👋 You have logged in!</div>
                                  </> 
                                )}
                               
                            </motion.div>
                            
                        ):(
                            <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.6,
                                    duration: 0.4
                                }
                            }}  >
                                <GoogleButton 
                                    type="light"
                                    onClick={handleGoogleSignIn}
                                    className='googleButton'/>
                            </motion.div>
                        )}
                        
                    <br></br>

                </div>
                
            </motion.div >
            </>
            )}
        </AnimatePresence>,
        document.getElementById('loginPortal')))
    }



export default LoginModal