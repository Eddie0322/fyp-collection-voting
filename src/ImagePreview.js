import { motion, AnimatePresence } from "framer-motion"
import './App.css';


const ImagePreview = ({hoverPoint, collections, objectsImageUrl }) => {

return(
            <AnimatePresence mode='wait'>

                        {hoverPoint && (

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

                        )}
            </AnimatePresence>
)
}

export default ImagePreview

