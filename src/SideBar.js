import './App.css';
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react'
import { UserAuth } from './AuthContext';

const SideBar = ({

                    optionToShow, 
                    setOptionToShow, 
                    showAllMesh, 
                    setShowAllMesh, 
                    setZoom, 
                    zoom, 
                    setFocus, 
                    centroidsArray,
                    hoverOnCentroid,
                    setHoverOnCentroid,

                    layout,
                    setLayout,

                    setSelectedPoint,
                    storeSelectedPoint,

                    cubeOptionToShow,
                    setCubeOptionToShow,

                    selectYourVotes,
                    setSelectYourVotes,
                    selectHasVotes,
                    setSelectHasVotes,
                    selectCubeUnvoted,
                    setSelectCubeUnvoted

                  }) => {

    const { user, userVotes } = UserAuth()
    
    const [hoverOnUnvoted, setHoverOnUnvoted] = useState(false)
    const [selectUnvoted, setSelectUnvoted] = useState(false)
    const [hoverShowAll, setHoverShowAll] = useState(false)

    const [hoverOnYourVotes, setHoverOnYourVotes] = useState(false)
    const [hoverOnHasVotes, setHoverOnHasVotes] = useState(false)
    const [hoverOnCubeUnvoted, setHoverOnCubeUnvoted] = useState(false)


    const LIGHT_COLOR = ["#ffff99", "#ffc3c3", "#c3c3ff", "#f6bb90", "#7ce764", "#99ffff", "#c3c388", "#cccccc", "#e580ff", "#9b6eff", "#33ff33", "#ec8a9e"]
    const LIGHT_COLOR_HOVER = ["#ffff990c", "#ffc3c30c", "#c3c3ff0c", "#f6bb900c", "#7ce7640c", "#99ffff0c", "#c3c3880c", "#cccccc0c", "#e580ff0c", "#9b6eff0c", "#33ff330c", "#ec8a9e0c"]
    const DEFAULT_COLOR = ["#ff3", "#f88", "#88f", "#e72", "#4d2", "#3ff", "#663", "#999", "#c0f", "#40d", "#060", "#c24"]
    let emoLabel = ["amusement", "intimate", "elegant", "lively", "spiritual", "calmness", "boredom", "strange", "mysterious", "anxiety", "sadness", "dread"]
    
    const PCAbuttonsConfig = [
        {
            text: emoLabel[0],
            backgroundColor: optionToShow === 0 ? LIGHT_COLOR_HOVER[0]  : "#00000000",
            color: hoverOnCentroid === 0 ? LIGHT_COLOR[0] : (optionToShow === 0 ? DEFAULT_COLOR[0] : "#b7b7b7"),
            hoverDotColor: hoverOnCentroid === 0 ? LIGHT_COLOR[0] : DEFAULT_COLOR[0]
        },
        {
          text: emoLabel[1],
          backgroundColor: optionToShow === 1 ? LIGHT_COLOR_HOVER[1]  : "#00000000",
          color: hoverOnCentroid === 1 ? LIGHT_COLOR[1] : (optionToShow === 1 ? DEFAULT_COLOR[1] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 1 ? LIGHT_COLOR[1] : DEFAULT_COLOR[1]
        },
        {
          text: emoLabel[2],
          backgroundColor: optionToShow === 2 ? LIGHT_COLOR_HOVER[2]  : "#00000000",
          color: hoverOnCentroid === 2 ? LIGHT_COLOR[2] : (optionToShow === 2 ? DEFAULT_COLOR[2] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 2 ? LIGHT_COLOR[2] : DEFAULT_COLOR[2]
        },
        {
          text: emoLabel[3],
          backgroundColor: optionToShow === 3 ? LIGHT_COLOR_HOVER[3]  : "#00000000",
          color: hoverOnCentroid === 3 ? LIGHT_COLOR[3] : (optionToShow === 3 ? DEFAULT_COLOR[3] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 3 ? LIGHT_COLOR[3] : DEFAULT_COLOR[3]
        },
        {
          text: emoLabel[4],
          backgroundColor: optionToShow === 4 ? LIGHT_COLOR_HOVER[4]  : "#00000000",
          color: hoverOnCentroid === 4 ? LIGHT_COLOR[4] : (optionToShow === 4 ? DEFAULT_COLOR[4] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 4 ? LIGHT_COLOR[4] : DEFAULT_COLOR[4]
        },
        {
          text: emoLabel[5],
          backgroundColor: optionToShow === 5 ? LIGHT_COLOR_HOVER[5]  : "#00000000",
          color: hoverOnCentroid === 5 ? LIGHT_COLOR[5] : (optionToShow === 5 ? DEFAULT_COLOR[5] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 5 ? LIGHT_COLOR[5] : DEFAULT_COLOR[5]
        },
        {
          text: emoLabel[6],
          backgroundColor: optionToShow === 6 ? LIGHT_COLOR_HOVER[6]  : "#00000000",
          color: hoverOnCentroid === 6 ? LIGHT_COLOR[6] : (optionToShow === 6 ? DEFAULT_COLOR[6] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 6 ? LIGHT_COLOR[6] : DEFAULT_COLOR[6]
        },
        {
          text: emoLabel[7],
          backgroundColor: optionToShow === 7 ? LIGHT_COLOR_HOVER[7]  : "#00000000",
          color: hoverOnCentroid === 7 ? LIGHT_COLOR[7] : (optionToShow === 7 ? DEFAULT_COLOR[7] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 7 ? LIGHT_COLOR[7] : DEFAULT_COLOR[7]
        },
        {
          text: emoLabel[8],
          backgroundColor: optionToShow === 8 ? LIGHT_COLOR_HOVER[8]  : "#00000000",
          color: hoverOnCentroid === 8 ? LIGHT_COLOR[8] : (optionToShow === 8 ? DEFAULT_COLOR[8] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 8 ? LIGHT_COLOR[8] : DEFAULT_COLOR[8]
        },
        {
          text: emoLabel[9],
          backgroundColor: optionToShow === 9 ? LIGHT_COLOR_HOVER[9]  : "#00000000",
          color: hoverOnCentroid === 9 ? LIGHT_COLOR[9] : (optionToShow === 9 ? DEFAULT_COLOR[9] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 9 ? LIGHT_COLOR[9] : DEFAULT_COLOR[9]
        },
        {
          text: emoLabel[10],
          backgroundColor: optionToShow === 10 ? LIGHT_COLOR_HOVER[10]  : "#00000000",
          color: hoverOnCentroid === 10 ? LIGHT_COLOR[10] : (optionToShow === 10 ? DEFAULT_COLOR[10] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 10 ? LIGHT_COLOR[10] : DEFAULT_COLOR[10]
        },
        {
          text: emoLabel[11],
          backgroundColor: optionToShow === 11 ? LIGHT_COLOR_HOVER[11]  : "#00000000",
          color: hoverOnCentroid === 11 ? LIGHT_COLOR[11] : (optionToShow === 11 ? DEFAULT_COLOR[11] : "#b7b7b7"),
          hoverDotColor: hoverOnCentroid === 11 ? LIGHT_COLOR[11] : DEFAULT_COLOR[11]
        },

    ]

    const CubeButtonsConfig = [
        {
          text: "Your Votes",
          backgroundColor: cubeOptionToShow === 0 ? "#d53d530c"  : "#00000000",
          color: hoverOnYourVotes ? "#d53" : (selectYourVotes ? "#d53" : "#b7b7b7"),
          hoverDotColor: hoverOnYourVotes ? "#d53" : "#d53"

        },
        {
          text: "Has Votes",
          backgroundColor: cubeOptionToShow === 1 ? "#ffffff0c"  : "#00000000",
          color: hoverOnHasVotes ? "#ffffff" : (selectHasVotes ? "#ffffff" : "#b7b7b7"),
          hoverDotColor: hoverOnHasVotes ? "#ffffff" : "#b7b7b7"
        },
        {
          text: "Unvoted",
          backgroundColor: cubeOptionToShow === 2 ? "#ffffff0c"  : "#00000000",
          color: hoverOnCubeUnvoted ? "#ffffff" : (selectCubeUnvoted ? "#ffffff" : "#b7b7b7"),
          hoverDotColor: hoverOnCubeUnvoted ? "#ffffff" : "#b7b7b7"
        }
    ]

    
    return(

      <>
       

          {layout === 'spiral' ? (

              <AnimatePresence mode='wait'>

                <>
                <motion.div
                      initial={{
                        opacity: 0
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                            duration: 1.5
                        }
                      }}
                      exit={{
                        opacity: 0
                      }}
                      className='sideBarPCA'>

                      <span 
                        style={{
                          display: "flex",
                          fontSize: "15px",
                          padding: "12px",
                          marginLeft: "12px",
                          marginBottom: "8px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          fontWeight: "600",
                          letterSpacing: "1.2px",
                          textTransform: "uppercase"
                        }}
                      
                      >Emotions</span>

                {
                PCAbuttonsConfig.map((config, index) => (

                  <motion.div 

                            key={index}
                            className='sideBarTagButtonContainer'
                            onClick={() => {
                                                  
                              if(optionToShow !== index){
                                setOptionToShow(index); 
                                setShowAllMesh(false)
                                setZoom(true)
                                setFocus(centroidsArray[index])
                                setSelectUnvoted(false)

                              }else{
                                setOptionToShow(null)
                                setShowAllMesh(!showAllMesh)
                                setZoom(false)
                                setSelectUnvoted(false)
                              }
                              
                            }}

                            onHoverStart={() => setHoverOnCentroid(index)}
                            onHoverEnd={() => setHoverOnCentroid(null)}

                            style={{
                                backgroundColor: config.backgroundColor,
                                color: config.color,
                                fontWeight: optionToShow === index ? "600" : "500"
                                
                              }}

                            whileHover={{
                                scale: 1.1,
                                letterSpacing: "1.5px",
                                transition: { duration: 0.3 },
                              }}

                              whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.1 },
                              }}
                      >
                          <motion.span 
                                  className="sideBarTagDot" 
                                  style={{backgroundColor: config.hoverDotColor}}
                          ></motion.span>

                        {config.text}
                          
                    </motion.div>

                ))}


                    <motion.div 

                        className='sideBarTagButtonContainer'
                        onClick={() => {
                                                
                                setShowAllMesh(true)
                                if(optionToShow && zoom){
                                  setZoom(true)
                                  setOptionToShow(null)
                                }else{
                                  setZoom(!zoom)
                                  setOptionToShow(null)
          
                                }
                        
                                setFocus({x: 0, y: 5, z: 0})

                                if(selectUnvoted){
                                  setSelectUnvoted(false)
                                }else{
                                  setSelectUnvoted(true)
                                }
                                

                    
                            }}

                        onHoverStart={() => {setHoverOnUnvoted(true);}}
                        onHoverEnd={() => {setHoverOnUnvoted(false);}}

                        style={{
                            backgroundColor: selectUnvoted ? "#b7b7b722" : "#00000000"  ,
                            color: hoverOnUnvoted ? "eeeeee" : "#b7b7b7",
                            fontWeight: selectUnvoted ? "600" : "500"
                            
                          }}

                        whileHover={{
                            scale: 1.1,
                            letterSpacing: "1.5px",
                            transition: { duration: 0.3 },
                          }}

                          whileTap={{
                            scale: 1.2,
                            transition: { duration: 0.1 },
                          }}
                        >
                        <motion.span 
                              className="sideBarTagDot" 
                              style={{backgroundColor: hoverOnUnvoted ? "#eeeeee" : "#b7b7b7"}}
                        ></motion.span>

                         Unvoted

                    </motion.div>

                    <motion.div 

                            className='sideBarTagButtonContainerShowAll'
                            onClick={() => {
                                                    
                                    setOptionToShow(null)
                                    setShowAllMesh(true)
                                    setZoom(false)
                                    setHoverOnCentroid(null)
                                    setSelectUnvoted(false)

                                }}

                            onHoverStart={() => {setHoverShowAll(true);}}
                            onHoverEnd={() => {setHoverShowAll(false);}}

                            style={{
                                color: hoverShowAll ? "eeeeee" : "#b7b7b7",
                                fontWeight: "500"
                                
                              }}

                            whileHover={{
                                scale: 1.1,
                                letterSpacing: "1.5px",
                                transition: { duration: 0.3 },
                              }}

                              whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.1 },
                              }}
                            >

                                Show All

                            </motion.div>

                      </motion.div>

                </>

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
                            duration: 0.5
                        }
                      }}
                      exit={{
                        opacity: 0
                      }}
                      className='sideBarCube'>

                          <span 
                            style={{
                              display: "flex",
                              fontSize: "15px",
                              padding: "12px",
                              marginLeft: "12px",
                              marginBottom: "8px",
                              fontFamily: "Arial, Helvetica, sans-serif",
                              fontWeight: "600",
                              letterSpacing: "1.2px",
                              textTransform: "uppercase"
                            }}
                          
                          >Votes</span>

                      {user && userVotes.length !== 0 ? (
                          <>

                           <motion.div 

                              className='sideBarTagButtonContainer'
                              onClick={() => {

                                      if(selectYourVotes){
                                        setSelectYourVotes(false)
                                        setCubeOptionToShow(null)
                                        setLayout('grid')
                                      }else{
                                        setSelectYourVotes(true)
                                        setCubeOptionToShow(0)
                                        setSelectHasVotes(false)
                                        setSelectCubeUnvoted(false)
                                        setLayout('userVotes')
                                        setZoom(false)
                                        storeSelectedPoint.current = null;
                                        setSelectedPoint(null)
                                      }

                                  }}

                              onHoverStart={() => {setHoverOnYourVotes(true);}}
                              onHoverEnd={() => {setHoverOnYourVotes(false);}}

                              style={{
                                    backgroundColor: CubeButtonsConfig[0].backgroundColor,
                                    color: CubeButtonsConfig[0].color,
                                    fontWeight: selectYourVotes ? "600" : "500"                                  
                                }}

                              whileHover={{
                                  scale: 1.1,
                                  letterSpacing: "1.5px",
                                  transition: { duration: 0.3 },
                                }}

                                whileTap={{
                                  scale: 1.2,
                                  transition: { duration: 0.1 },
                                }}
                              >

                              <motion.span 
                                      className="sideBarTagDot" 
                                      style={{backgroundColor: CubeButtonsConfig[0].hoverDotColor}}
                              ></motion.span>

                                  {CubeButtonsConfig[0].text}

                           </motion.div>
                          
                        </>):(
                          <>
                            <div style={{height: "0%"}}>
                              
                            </div>
                          </>
                        )
                      
                      }

                        <motion.div 

                              className='sideBarTagButtonContainer'
                              onClick={() => {

                                      if(selectHasVotes){
                                        setSelectHasVotes(false)
                                        setCubeOptionToShow(null)

                                        setLayout('grid')

                                      }else{
                                        setSelectHasVotes(true)
                                        setCubeOptionToShow(1)

                                        setSelectYourVotes(false)
                                        setSelectCubeUnvoted(false)

                                        setLayout('hasVotes')
                                        setZoom(false)

                                        storeSelectedPoint.current = null;
                                        setSelectedPoint(null)
                                      }

                                  }}

                              onHoverStart={() => {setHoverOnHasVotes(true);}}
                              onHoverEnd={() => {setHoverOnHasVotes(false);}}

                              style={{
                                    backgroundColor: CubeButtonsConfig[1].backgroundColor,
                                    color: CubeButtonsConfig[1].color,
                                    fontWeight: selectHasVotes ? "600" : "500"                                  
                                }}

                              whileHover={{
                                  scale: 1.1,
                                  letterSpacing: "1.5px",
                                  transition: { duration: 0.3 },
                                }}

                                whileTap={{
                                  scale: 1.2,
                                  transition: { duration: 0.1 },
                                }}
                              >

                              <motion.span 
                                      className="sideBarTagDotLarge" 
                                      style={{backgroundColor: CubeButtonsConfig[1].hoverDotColor}}
                              ></motion.span>                         

                                  {CubeButtonsConfig[1].text}

                        </motion.div>

                        <motion.div 

                              className='sideBarTagButtonContainer'
                              onClick={() => {

                                      if(selectCubeUnvoted){
                                        setSelectCubeUnvoted(false)
                                        setCubeOptionToShow(null)
                                        setLayout('grid')
                                      }else{
                                        setSelectCubeUnvoted(true)
                                        setCubeOptionToShow(2)

                                        setSelectYourVotes(false)
                                        setSelectHasVotes(false)

                                        setLayout('unVoted')
                                        setZoom(false)

                                        storeSelectedPoint.current = null;
                                        setSelectedPoint(null)
                                      }

                                  }}

                              onHoverStart={() => {setHoverOnCubeUnvoted(true);}}
                              onHoverEnd={() => {setHoverOnCubeUnvoted(false);}}

                              style={{
                                    backgroundColor: CubeButtonsConfig[2].backgroundColor,
                                    color: CubeButtonsConfig[2].color,
                                    fontWeight: selectCubeUnvoted ? "600" : "500"                                  
                                }}

                              whileHover={{
                                  scale: 1.1,
                                  letterSpacing: "1.5px",
                                  transition: { duration: 0.3 },
                                }}

                                whileTap={{
                                  scale: 1.2,
                                  transition: { duration: 0.1 },
                                }}
                              >

                              <motion.span 
                                      className="sideBarTagDot" 
                                      style={{backgroundColor: CubeButtonsConfig[2].hoverDotColor}}
                              ></motion.span>     

                                  {CubeButtonsConfig[2].text}

                        </motion.div>

                        <motion.div 

                              className='sideBarTagButtonContainerShowAll'
                              onClick={() => {
                                                      
                                      setCubeOptionToShow(null)
                                      setSelectYourVotes(false)
                                      setSelectHasVotes(false)
                                      setSelectCubeUnvoted(false)
                                      setLayout('grid')

                                  }}

                              onHoverStart={() => {setHoverShowAll(true);}}
                              onHoverEnd={() => {setHoverShowAll(false);}}

                              style={{
                                  color: hoverShowAll ? "eeeeee" : "#b7b7b7",
                                  fontWeight: "500"
                                  
                                }}

                              whileHover={{
                                  scale: 1.1,
                                  letterSpacing: "1.5px",
                                  transition: { duration: 0.3 },
                                }}

                                whileTap={{
                                  scale: 1.2,
                                  transition: { duration: 0.1 },
                                }}
                              >

                                  Show All

                              </motion.div>

                    </motion.div>
                
                </>

                
              )
              
              }


      </>

    )

}

export default SideBar