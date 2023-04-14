import { raycast, MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState } from "react";



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


    if(layout === "spiral"){
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
          <mesh raycast={raycast} onPointerOver={console.log} key={index}>
            <meshLineGeometry points={object} />
            <meshLineMaterial lineWidth={0.008} color="#ff3" />
          </mesh>  
      )
    })

    linesIntimate = resultIntimate.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#05d" />
            </mesh>  
        )
      })

    linesElegant = resultElegant.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#88f" />
            </mesh>  
        )
    })     

    linesLively = resultLively.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#e72" />
            </mesh>  
        )
    })   

    linesSpiritual = resultSpiritual.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#e33" />
            </mesh>  
        )
    })   

    linesCalmness = resultCalmness.map((object, index) => {
      return(
          <mesh raycast={raycast} onPointerOver={console.log} key={index}>
            <meshLineGeometry points={object} />
            <meshLineMaterial lineWidth={0.008} color="#c0f" />
          </mesh>  
      )
    })

    linesBoredom = resultBoredom.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#3ff" />
            </mesh>  
        )
      })

      linesStrange = resultStrange.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#0c0" />
            </mesh>  
        )
      })

      linesMysterious = resultMysterious.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#663" />
            </mesh>  
        )
      })

      linesAnxiety = resultAnxiety.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#777" />
            </mesh>  
        )
      })

      linesSadness = resultSadness.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#933" />
            </mesh>  
        )
      })

      linesDread = resultDread.map((object, index) => {
        return(
            <mesh raycast={raycast} onPointerOver={console.log} key={index}>
              <meshLineGeometry points={object} />
              <meshLineMaterial lineWidth={0.008} color="#ccc" />
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
    }
    

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