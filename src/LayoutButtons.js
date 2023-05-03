import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

const LayoutButtons = ({
                layout,
                setLayout,
                setCubeOptionToShow,
                setSelectYourVotes,
                setSelectHasVotes,
                setSelectCubeUnvoted,
                zoom,
                setZoom,
                setShowAllMesh,
                setHoverOnCentroid,
                setOptionToShow

                }) => {

    const [hoverOnPCA, setHoverOnPCA] = React.useState(false)
    const [hoverOnCube, setHoverOnCube] = React.useState(false)

    return(            
    
    <div className='controls'>

                <motion.button 

                    onClick={() => {
                    setLayout('spiral');
                    setCubeOptionToShow(null);
                    setSelectYourVotes(false);
                    setSelectHasVotes(false);
                    setSelectCubeUnvoted(false);
                    }}

                    onHoverStart={() => {setHoverOnPCA(true); setHoverOnCube(false)}}
                    onHoverEnd ={() => {setHoverOnPCA(false)}}

                    style={{
                        color: layout === 'spiral' || hoverOnPCA ? "#eeeeee" : "#cccccc",
                        fontWeight: layout === 'spiral' || hoverOnPCA ? "bold" : "normal"
                    }}


                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 }
                    }}

                    
                >
                    <motion.span
                        style={{
                            position: "absolute",
                            borderRadius: 10,
                            bottom: 0,
                            left: "50%",
                            width: 0,
                            height: 2,
                            backgroundColor: "#D1FF71",
                            originX: 0.5,
                            transition: { ease: "easeIn", duration: 0.4 }
                          }}

                        animate={{
                            width: layout === 'spiral' ? "100%" : 0,
                            left: layout === 'spiral' ? 0 : "50%",
                        }}
                        
                    />


                     Emotions
                </motion.button>


                <motion.button 
                        onClick={() => {
    
                            if(layout !== 'spiral'){
                                if(zoom){setZoom(false)}
                                setOptionToShow(null)
                            }else{
                                setLayout('grid'); 
                                setShowAllMesh(true); 
                                setOptionToShow(null)
                                setHoverOnCentroid(null)
                                if(zoom){setZoom(false)}
                            }
                        }}

                        onHoverStart={() => {setHoverOnCube(true); setHoverOnPCA(false)}}
                        onHoverEnd ={() => {setHoverOnCube(false)}}
    
                        style={{
                            color: layout !== 'spiral' || hoverOnCube ? "#eeeeee" : "#cccccc",
                            fontWeight: layout !== 'spiral' || hoverOnCube ? "bold" : "normal"
                        }}
    
    
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.3 }
                        }}
                        
                    >
                        <motion.span
                            style={{
                                position: "absolute",
                                borderRadius: 10,
                                bottom: 0,
                                left: "50%",
                                width: 0,
                                height: 2,
                                backgroundColor: "#D1FF71",
                                originX: 0.5,
                                transition: { ease: "easeIn", duration: 0.4 }
                              }}
    
                            animate={{
                                width: layout !== 'spiral' ? "100%" : 0,
                                left: layout !== 'spiral'  ? 0 : "50%",
                            }}
                            
                        />
                    Votes
                </motion.button>

        </div>

    )

}

export default LayoutButtons