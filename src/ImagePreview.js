import { motion, AnimatePresence } from "framer-motion"
import './App.css';
import pointer from "./assets/Pointer.png";
import drag from "./assets/drag.png"


const ImagePreview = ({hoverPoint, collections, objectsImageUrl }) => {

return(
            <AnimatePresence mode='wait'>

                {hoverPoint ? (
                    <AnimatePresence mode='wait'>
                            <motion.div 
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                className='hoverBox'>

                                {/* <div className="vote-tag">
                                       <div>You have voted for this collection</div>
                                </div>    */}
                    
                                <div className="selected-point">
                                        <div>Collection {hoverPoint.id}</div>
                                </div>    
                                
                                
                                <div className="hover-tag">  
                                        <strong >{collections[hoverPoint.id].title}</strong>                        
                                </div>

                                <motion.div 
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.1,
                                            delay: 0.3
                                        }
                                    }}
                                    exit={{
                                        opacity: 0
                                    }} 
                                    className="hover-image">
                                            <img 
                                                src = {"https://www.artic.edu/iiif/2/"+objectsImageUrl[hoverPoint.id]+"/full/843,/0/default.jpg"} 
                                                loading = "lazy"
                                                alt = ""
                                                className='hoverBoxImg'
                                            />
                                </motion.div>

                        </motion.div>
                        </AnimatePresence>

                        ):(
                            <>
                            <motion.div 
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.3
                                    }
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                className='hoverBoxSmall'>

                                {/* <div className="vote-tag">
                                       <div>You have voted for this collection</div>
                                </div>    */}
                                <div className="selected-point">
                                        <div>How To</div><br></br>
                                </div>    
  
                                <div className="hover-info">  
                                        Explore 1,000 Painting Collections of <br></br>
                                        The Art Institute Of Chicago                  
                                </div>

                                <motion.div     
                                    initial={{
                                            opacity: 0
                                        }}
                                        animate={{
                                            opacity: 1,
                                            transition: {
                                                duration: 0.8
                                            }
                                        }}    
                                    className="hover-image-info">
                                        <div class="left">
                                                <img class="logo" src={pointer} alt="Logo" />
                                                 <p class="description">Hover / Click On Points</p>
                                        </div>
                                        <div class="right">
                                                <img class="logo" src={drag} alt="Logo" />
                                                <p class="description">Scroll / Drag On Screen</p>
                                        </div>
                                </motion.div>

                        </motion.div>
                            
                            </>
                        )
                    }
            </AnimatePresence>
)
}

export default ImagePreview

