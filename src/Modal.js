import React from 'react';
import ReactDom from 'react-dom';
import crossSVG from "./assets/cross.svg";
import EmotionSelection from './emotionSelection';
import './App.css';
import './button.scss'
import { motion, AnimatePresence } from "framer-motion"
import StackedBar from './Chart';
import { UserAuth } from './AuthContext';
import NextPrevButtons from './NextPrevButtons';

const Modal = ({ 
                id, 
                openModal, 
                closeModal, 
                image, 
                info, 
                infoTitle, 
                voteCount, 
                openVote, 
                closeVote, 
                setOpenVote,
                checkVoteOpen, 
                setOpenModal, 
                stackedBarLabel,
                stackedBarValue,
                stackedBarColors,
                setOpenLoginModal,
                setZoom,
                storeSelectedPoint,
                setUpdatePosLoading,
                setIsVoteByUser,
                selectedPoint,
                setSelectedPoint,
                data,
                zoomToView,
                layout,
                setLayout,
                setSelectUnvoted,
                setCubeOptionToShow,
                setSelectYourVotes,
                setSelectHasVotes,
                setSelectCubeUnvoted,
            }) => {


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
                        onClick={e => { e.stopPropagation(); }}
                    >   

                                <NextPrevButtons 
                                        id = {id}
                                        setOpenModal = {setOpenModal}
                                        setOpenVote = {setOpenVote}
                                        setZoom = {setZoom}
                                        storeSelectedPoint = {storeSelectedPoint}
                                        selectedPoint = {selectedPoint}
                                        setSelectedPoint = {setSelectedPoint}
                                        data = {data}
                                        zoomToView = {zoomToView}
                                        layout = {layout}
                                />
                    </motion.div>

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
                                 className="content-left"
                            >
                                  {image}
                            </motion.div>

                            <motion.div 
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0.2,
                                        duration: 0.4
                                    }
                                }}                 
                                className="content-right"
                            >
                                <div 
                                                                  
                                    className='HeaderRow'
                                >
                                    <img style={{ width: "5%", cursor: "pointer" }} src={crossSVG} alt="" onClick={closeModal}></img>    
                                </div> 

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
                     <motion.div 
                        onClick={e => { e.stopPropagation(); }}
                    >   

                                <NextPrevButtons 
                                        id = {id}
                                        setOpenModal = {setOpenModal}
                                        setOpenVote = {setOpenVote}
                                        setZoom = {setZoom}
                                        storeSelectedPoint = {storeSelectedPoint}
                                        selectedPoint = {selectedPoint}
                                        setSelectedPoint = {setSelectedPoint}
                                        data = {data}
                                        zoomToView = {zoomToView}
                                        layout = {layout}
                                />
                    </motion.div>

                    <div 
                        className='modalContent' 
                        ref={contentRef} 
                        onClick={e => { e.stopPropagation(); }}
                    >


                            <motion.div             
                                 className="content-left"
                            >
                                  {image}
                            </motion.div>

                        <motion.div 
                                initial={{
                                    opacity: 1,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0.2,
                                        duration: 0.4
                                    }
                                }}                 
                                className="content-right">
                                <div className='HeaderRow'>
                                     <img style={{ width: "5%", cursor: "pointer" }} src={crossSVG} alt="" onClick={closeModal}></img>     
                                </div> 

                            {infoTitle}

                        <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0,
                                        duration: 0.5
                                    }
                                }}                                            
                            >

                            <EmotionSelection
                                id = {id}
                                setOpenModal = {setOpenModal}
                                setOpenLoginModal = {setOpenLoginModal}
                                setZoom = {setZoom}
                                storeSelectedPoint = {storeSelectedPoint}
                                setUpdatePosLoading = {setUpdatePosLoading}
                                setIsVoteByUser = {setIsVoteByUser}
                                layout = {layout}
                                setLayout = {setLayout}
                                setSelectUnvoted = {setSelectUnvoted}
                                setCubeOptionToShow = {setCubeOptionToShow}
                                setSelectYourVotes = {setSelectYourVotes}
                                setSelectHasVotes = {setSelectHasVotes}
                                setSelectCubeUnvoted = {setSelectCubeUnvoted}
                                closeVote = {closeVote}

                            />
                        </motion.div>
                        </motion.div>
                        
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