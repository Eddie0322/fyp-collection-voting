import { raycast, MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState, Fragment } from "react";
import { motion } from "framer-motion-3d"


extend({ MeshLineGeometry, MeshLineMaterial })


function storeResult(arr, result){
    for (let i = 0; i < arr.length - 1; i++) {
        // This is where you'll capture that last value
        for (let j = i + 1; j < arr.length; j++) {
          result.push([arr[i], arr[j]]);
        }
      }
}


let lineWidth = 0.003

const varShow = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 0.5, 
    transition: {
        delay: 0,
        duration: 0.5
  } },
}

const varHide = {
  visible: { opacity: 0.5 },
  hidden: { 
    opacity: 0, 
    transition: {
        delay: 0,
        duration: 0.5
  } },
}


const Lines = ({data, layout, optionToShow, showAllMesh}) => {


  //state of emotions line points
  const [amusementLinePoints, setAmusementLinePoints] = useState([]);
  const [intimateLinePoints, setIntimateLinePoints] = useState([]);
  const [elegantLinePoints, setElegantLinePoints] = useState([]);
  const [livelyLinePoints, setLivelyLinePoints] = useState([]);
  const [spiritualLinePoints, setSpiritualLinePoints] = useState([]);
  const [calmnessLinePoints, setCalmnessLinePoints] = useState([]);
  const [boredomLinePoints, setBoredomLinePoints] = useState([]);
  const [strangeLinePoints, setStrangeLinePoints] = useState([]);
  const [mysteriousLinePoints, setMysteriousLinePoints] = useState([]);
  const [anxietyLinePoints, setAnxietyLinePoints] = useState([]);
  const [sadnessLinePoints, setSadnessLinePoints] = useState([]);
  const [dreadLinePoints, setDreadLinePoints] = useState([]);

  useEffect(() => {
    
    //PCA arrays of emotions
    let arrAmusement = [];
    let arrIntimate = [];
    let arrElegant = [];
    let arrLively = [];
    let arrSpiritual = [];
    let arrCalmness = [];
    let arrBoredom = [];
    let arrStrange = [];
    let arrMysterious = [];
    let arrAnxiety = [];
    let arrSadness = [];
    let arrDread = [];

    //Pairs of start points and end points of lines 
    let resultAmusement = [];
    let resultIntimate = [];
    let resultElegant = [];
    let resultLively = [];
    let resultSpiritual = [];
    let resultCalmness = [];
    let resultBoredom = [];
    let resultStrange = [];
    let resultMysterious = [];
    let resultAnxiety = [];
    let resultSadness = [];
    let resultDread = [];


      for (let i = 0; i < data.length; ++i) {
        if ( data[i].totalVote !== 0 && data[i].Label === 0 ) {
          arrAmusement.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        } 
        else if ( data[i].totalVote !== 0 && data[i].Label === 1 ) {
          arrIntimate.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 2 ) {
          arrElegant.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 3 ) {
          arrLively.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 4 ) {
          arrSpiritual.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 5 ) {
          arrCalmness.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 6 ) {
          arrBoredom.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 7 ) {
          arrStrange.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 8 ) {
          arrMysterious.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))    
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 9 ) {
          arrAnxiety.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 10 ) {
          arrSadness.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
        else if ( data[i].totalVote !== 0 && data[i].Label === 11 ) {
          arrDread.push(new THREE.Vector3(data[i].x, data[i].y, data[i].z))  
        }
      }
  
    //
    //Store Results
    storeResult(arrAmusement, resultAmusement)
    storeResult(arrIntimate, resultIntimate)
    storeResult(arrElegant, resultElegant)
    storeResult(arrLively, resultLively)
    storeResult(arrSpiritual, resultSpiritual)
    storeResult(arrCalmness, resultCalmness)
    storeResult(arrBoredom, resultBoredom)
    storeResult(arrStrange, resultStrange)
    storeResult(arrMysterious, resultMysterious)
    storeResult(arrAnxiety, resultAnxiety)
    storeResult(arrSadness, resultSadness)
    storeResult(arrDread, resultDread)

  

          //Set state values
          setAmusementLinePoints(resultAmusement)
          setIntimateLinePoints(resultIntimate)
          setElegantLinePoints(resultElegant)
          setLivelyLinePoints(resultLively)
          setSpiritualLinePoints(resultSpiritual)
          setCalmnessLinePoints(resultCalmness)
          setBoredomLinePoints(resultBoredom)
          setStrangeLinePoints(resultStrange)
          setMysteriousLinePoints(resultMysterious)
          setAnxietyLinePoints(resultAnxiety)
          setSadnessLinePoints(resultSadness)
          setDreadLinePoints(resultDread)

          console.log("Line updates!")
    
    

  },[data, layout])


  if(layout !== 'spiral') return null

  return(
    
    <>
    {showAllMesh ? (
        <>
            {amusementLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#ff3" />
                
                </mesh>
                </Fragment>
              )
            })}

            {intimateLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#f88" />
                
                </mesh>
                </Fragment>
              )
            })}

            {elegantLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#88f" />
                
                </mesh>
                </Fragment>
              )
            })}

            {livelyLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#e72" />
                
                </mesh>
                </Fragment>
              )
            })}

            {spiritualLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#4d2" />
                
                </mesh>
                </Fragment>
              )
            })}

            {calmnessLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#3ff" />
                
                </mesh>
                </Fragment>
              )
            })}

            {boredomLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#663" />
                
                </mesh>
                </Fragment>
              )
            })}

            {strangeLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#999" />
                
                </mesh>
                </Fragment>
              )
            })}

            {mysteriousLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#c0f" />
                
                </mesh>
                </Fragment>
              )
            })}

            {anxietyLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {'hidden'}
                                  animate = {'visible'}
                                  variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#40d" />
                
                </mesh>
                </Fragment>
              )
            })} 

            {sadnessLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                 initial = {'hidden'}
                                 animate = {'visible'}
                                 variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#060" />
                
                </mesh>
                </Fragment>
              )
            })} 

            {dreadLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                 initial = {'hidden'}
                                 animate = {'visible'}
                                 variants = {varShow}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#c24" />
                
                </mesh>
                </Fragment>
              )
            })} 
      </>
    ) : (
      <>
                   {amusementLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 0 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 0 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 0 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#ff3" />
                
                </mesh>
                </Fragment>
              )
            })}

            {intimateLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 1 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 1 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 1 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#f88" />
                
                </mesh>
                </Fragment>
              )
            })}

            {elegantLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 2 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 2 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 2 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#88f" />
                
                </mesh>
                </Fragment>
              )
            })}

            {livelyLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 3 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 3 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 3 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#e72" />
                
                </mesh>
                </Fragment>
              )
            })}

            {spiritualLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 4 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 4 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 4 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#4d2" />
                
                </mesh>
                </Fragment>
              )
            })}

            {calmnessLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 5 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 5 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 5 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#3ff" />
                
                </mesh>
                </Fragment>
              )
            })}

            {boredomLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 6 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 6 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 6 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#663" />
                
                </mesh>
                </Fragment>
              )
            })}

            {strangeLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 7 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 7 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 7 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#999" />
                
                </mesh>
                </Fragment>
              )
            })}

            {mysteriousLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 8 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 8 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 8 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#c0f" />
                
                </mesh>
                </Fragment>
              )
            })}

            {anxietyLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 9 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 9 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 9 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#40d" />
                
                </mesh>
                </Fragment>
              )
            })} 

            {sadnessLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 10 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 10 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 10 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#060" />
                
                </mesh>
                </Fragment>
              )
            })} 

            {dreadLinePoints.map((object, index) => {
              return (
                <Fragment key={index}>
                <mesh>
                            <meshLineGeometry points={object} />
                            <motion.meshLineMaterial 
                                  initial = {optionToShow === 11 ? 'hidden' : 'visible'}
                                  animate = {optionToShow === 11 ? 'visible' : 'hidden'}
                                  variants = {optionToShow === 11 ? varShow : varHide}
                                  transparent = {true}
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                  lineWidth={lineWidth} 
                                  color="#c24" />
                
                </mesh>
                </Fragment>
              )
            })} 
      </>
    )}
      
    </>
  )
    
};



export default Lines;