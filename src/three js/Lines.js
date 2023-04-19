import { raycast, MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { motion } from "framer-motion-3d"


extend({ MeshLineGeometry, MeshLineMaterial })

//Components of emotions lines 
let linesAmusement
let linesIntimate
let linesElegant
let linesLively
let linesSpiritual
let linesCalmness
let linesBoredom
let linesStrange
let linesMysterious
let linesAnxiety
let linesSadness
let linesDread

function storeResult(arr, result){
    for (let i = 0; i < arr.length - 1; i++) {
        // This is where you'll capture that last value
        for (let j = i + 1; j < arr.length; j++) {
          result.push([arr[i], arr[j]]);
        }
      }
}


let lineWidth = 0.004

const variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 0.5, 
    transition: {
        delay: 0.5,
        duration: 1
} },
}


const Lines = ({data, layout}) => {

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


    //
    //map to lines components
    linesAmusement = resultAmusement.map((object, index) => {
      return(
         // <mesh raycast={raycast} onPointerOver={console.log} key={index}>
          <mesh raycast={raycast} key={index}>
            <meshLineGeometry points={object} />
            <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#ff3" />
          </mesh>  
      )
    })

    linesIntimate = resultIntimate.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#f88" />
            </mesh>  
        )
      })

    linesElegant = resultElegant.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#88f" />
            </mesh>  
        )
    })     

    linesLively = resultLively.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#e72" />
            </mesh>  
        )
    })   

    linesSpiritual = resultSpiritual.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#4d2" />
            </mesh>  
        )
    })   

    linesCalmness = resultCalmness.map((object, index) => {
      return(
          <mesh raycast={raycast} key={index}>
            <meshLineGeometry points={object} />
            <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#3ff" />
          </mesh>  
      )
    })

    linesBoredom = resultBoredom.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#663" />
            </mesh>  
        )
      })

      linesStrange = resultStrange.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#999" />
            </mesh>  
        )
      })

      linesMysterious = resultMysterious.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#c0f" />
            </mesh>  
        )
      })

      linesAnxiety = resultAnxiety.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#40d" />
            </mesh>  
        )
      })

      linesSadness = resultSadness.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#060" />
            </mesh>  
        )
      })

      linesDread = resultDread.map((object, index) => {
        return(
            <mesh raycast={raycast} key={index}>
              <meshLineGeometry points={object} />
              <motion.meshLineMaterial initial="hidden" animate="visible" variants={variants} lineWidth={lineWidth} color="#c24" />
            </mesh>  
        )
      })

          //
          //Set state values
          setAmusementLinePoints(linesAmusement)
          setIntimateLinePoints(linesIntimate)
          setElegantLinePoints(linesElegant)
          setLivelyLinePoints(linesLively)
          setSpiritualLinePoints(linesSpiritual)
          setCalmnessLinePoints(linesCalmness)
          setBoredomLinePoints(linesBoredom)
          setStrangeLinePoints(linesStrange)
          setMysteriousLinePoints(linesMysterious)
          setAnxietyLinePoints(linesAnxiety)
          setSadnessLinePoints(linesSadness)
          setDreadLinePoints(linesDread)


    
    

  },[data, layout])



  if(layout === "grid") return null

  return(
    <>
      {amusementLinePoints} 
      {intimateLinePoints}
      {elegantLinePoints}
      {livelyLinePoints}
      {spiritualLinePoints}
      {calmnessLinePoints}
      {boredomLinePoints}
      {strangeLinePoints}
      {mysteriousLinePoints}
      {anxietyLinePoints}
      {sadnessLinePoints}
      {dreadLinePoints}
    </>
  )
    
};



export default Lines;