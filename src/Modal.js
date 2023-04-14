import React from 'react';
import ReactDom from 'react-dom';
import crossSVG from "./assets/cross.svg";
import EmotionSelection from './emotionSelection';
import './App.css';
import './button.scss'
import { motion, AnimatePresence } from "framer-motion"
import StackedBar from './Chart';
import { UserAuth } from './AuthContext';

const Modal = ({ 
                id, 
                openModal, 
                closeModal, 
                image, 
                info, 
                infoTitle, 
                infoDate, 
                voteCount, 
                openVote, 
                closeVote, 
                checkVoteOpen, 
                setOpenModal, 
                stackedBarLabel,
                stackedBarValue,
                stackedBarColors,
                setOpenLoginModal,
                setZoom }) => {


    const contentRef = React.useRef();
    const { userVotes } = UserAuth();

    // if (!openModal) return null;
    if (!checkVoteOpen){
        return ReactDom.createPortal(
         <AnimatePresence mode='wait'>
            
            {openModal && (!checkVoteOpen) && (
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
                onClick={closeModal}
                >

                    <motion.div 
                        initial={{
                            scale: 0.9
                         }}
                        animate={{
                            scale: 1,
                            transition: {
                                duration: 0.2
                            }
                         }}
                        exit={{
                            scale: 0.9,
                            opacity: 0
                        }}
                        className='modalContent' 
                        ref={contentRef} 
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
                                <img style={{ width: "24px", cursor: "pointer" }} src={crossSVG} alt="" onClick={closeModal}></img>    
                            </motion.div> 

                            <motion.div             
                                 className="content-left"
                            >
                                  {image}
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
                                className="content-right"
                            >

                                {info}
                                {voteCount}
                                <div className='stackedBar'>
                                    <StackedBar
                                        stackedBarLabel = {stackedBarLabel}
                                        stackedBarValue = {stackedBarValue}
                                        stackedBarColors = {stackedBarColors}
                                    />
                                </div>         

                                <motion.div 
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            delay: 0.6,
                                            duration: 0.5
                                        }
                                    }}                    
                                className='button-row'
                                >
                                    {userVotes.includes(id)?(
                                        <button onClick={openVote} className="btn"><p>Edit Your Vote</p></button>
                                    ):(
                                        <button onClick={openVote} className="btn"><p>Vote</p></button>
                                    )}   
                                    

                                </motion.div>

                            </motion.div> 

                    </motion.div>

            </motion.div>
            </>
            )}
           
        </AnimatePresence>,
    
            document.getElementById('portal')                       
        
        );

    } else {
            return ReactDom.createPortal(

                <AnimatePresence mode='wait'>

                {openModal && checkVoteOpen && (
                
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
                    onClick={closeModal}
                >

                    <div 
                        className='modalContent' 
                        ref={contentRef} 
                        onClick={e => { e.stopPropagation(); }}
                    >

                        <div 
                            className='HeaderRow'
                        >

                            <img style={{ width: "24px", cursor: "pointer" }} src={crossSVG} alt="" onClick={closeModal}></img>    

                        </div> 

                        <div 
                            className="content-left"
                        > 
                            {image}
                        </div>

                        <div 
                            className="content-right"
                        >

                            {infoTitle}
                            {infoDate}
                            <hr></hr>

                        <motion.div
                                initial={{
                                    opacity: 0,
                                    x: 50
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        delay: 0,
                                        duration: 0.2
                                    }
                                }}                                            
                            >

                            <EmotionSelection
                                id = {id}
                                setOpenModal = {setOpenModal}
                                setOpenLoginModal = {setOpenLoginModal}
                                setZoom = {setZoom}
                            />
                       

                        <div className='button-row'>
                             <button onClick={closeVote} className="btn"><p>Back</p></button>
                        </div>
                            
                        </motion.div>

                        </div>
                        
                    </div>
                </motion.div>
                </>
                )}
            </AnimatePresence>,

                document.getElementById('portal')

        );
    }
    
};

export default Modal;