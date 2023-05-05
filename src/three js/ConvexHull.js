import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion-3d"
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const ConvexHull = ({
                      data, 
                      layout,
                      optionToShow,
                      showAllMesh,
                      setCentroidsArray,
                      hoverOnCentroid,
                      setZoom,
                      setFocus,
                      setShowAllMesh,
                      setOptionToShow,
                      centroidsArray,
                      setHoverOnCentroid,
                      setConvexHullLoading
                    }) => {    


    const [textRefArr, setTextRefArr] = useState();

    const convexRefAmusement = useRef();
    const convexRefIntimate = useRef();
    const convexRefElegant = useRef();
    const convexRefLively = useRef();
    const convexRefSpiritual = useRef();
    const convexRefCalmness = useRef();
    const convexRefBoredom = useRef();
    const convexRefStrange = useRef();
    const convexRefMysterious = useRef();
    const convexRefAnxiety = useRef();
    const convexRefSadness = useRef();
    const convexRefDread = useRef();

    const centroidRefAmusement = useRef();
    const centroidRefIntimate = useRef();
    const centroidRefElegant = useRef();
    const centroidRefLively = useRef();
    const centroidRefSpiritual = useRef();
    const centroidRefCalmness = useRef();
    const centroidRefBoredom = useRef();
    const centroidRefStrange = useRef();
    const centroidRefMysterious = useRef();
    const centroidRefAnxiety = useRef();
    const centroidRefSadness = useRef();
    const centroidRefDread = useRef();

    const flag = useRef(true);
    const flag2 = useRef(true);

    const count = useRef(1)


    const varShow = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 0.2, 
        transition: {
            delay: 0.6,
            duration: 0.4
      } },
    }

    const varHide = {
      visible: { opacity: 0.2 },
      hidden: { 
        opacity: 0, 
        transition: {
            delay: 1,
            duration: 0.5
      } },
    }

    const varHoverStart = {
      normal: { opacity: 0.2 },
      hover: {
        opacity:0.5,
        transition: {
          delay: 0.2,
          duration:0.2
        }
      }
    }

    const varHoverHide = {
      normal: { opacity: 0.2 },
      hover: {
        opacity:0.1,
        transition: {
          delay: 0.1,
          duration:0.1
        }
      }
    }

    //Text
    //let refArr = []

    const textRef0 = useRef();
    const textRef1 = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();
    const textRef4 = useRef();
    const textRef5 = useRef();
    const textRef6 = useRef();
    const textRef7 = useRef();
    const textRef8 = useRef();
    const textRef9 = useRef();
    const textRef10 = useRef();
    const textRef11 = useRef();


    const LIGHT_COLOR = ["#ffff99", "#ffc3c3", "#c3c3ff", "#f6bb90", "#7ce764", "#99ffff", "#c3c388", "#cccccc", "#e580ff", "#9b6eff", "#33ff33", "#ec8a9e"]
    const DARK_COLOR = ["#4c4c00", "#620000", "#000062", "#3f1d05", "#113709", "#004c4c", "#19190d", "#262626", "#330040", "#110037", "#001a00", "#330811"]

       // Define an array of button configurations
       const buttonConfigs = [
        {
          text: 'Amusement',
          color: optionToShow === null || optionToShow === 0 || hoverOnCentroid === 0 ? LIGHT_COLOR[0] : DARK_COLOR[0],
        },
        {
          text: 'Intimate',
          color: optionToShow === null || optionToShow === 1 || hoverOnCentroid === 1 ? LIGHT_COLOR[1] : DARK_COLOR[1],
        },
        {
          text: 'Elegant',
          color: optionToShow === null || optionToShow === 2 || hoverOnCentroid === 2 ? LIGHT_COLOR[2] : DARK_COLOR[2],
        },
        {
          text: 'Lively',
          color: optionToShow === null || optionToShow === 3 || hoverOnCentroid === 3 ? LIGHT_COLOR[3] : DARK_COLOR[3],
        },
        {
          text: 'Spiritual',
          color: optionToShow === null || optionToShow === 4 || hoverOnCentroid === 4 ? LIGHT_COLOR[4] : DARK_COLOR[4],
        },
        {
          text: 'Calmness',
          color: optionToShow === null || optionToShow === 5 || hoverOnCentroid === 5 ? LIGHT_COLOR[5] : DARK_COLOR[5],
        },
        {
          text: 'Boredom',
          color: optionToShow === null || optionToShow === 6 || hoverOnCentroid === 6 ? LIGHT_COLOR[6] : DARK_COLOR[6],
        },
        {
          text: 'Strange',
          color: optionToShow === null || optionToShow === 7 || hoverOnCentroid === 7 ? LIGHT_COLOR[7] : DARK_COLOR[7],
        },
        {
          text: 'Mysterious',
          color: optionToShow === null || optionToShow === 8 || hoverOnCentroid === 8 ? LIGHT_COLOR[8] : DARK_COLOR[8],
        },
        {
          text: 'Anxiety',
          color: optionToShow === null || optionToShow === 9 || hoverOnCentroid === 9 ? LIGHT_COLOR[9] : DARK_COLOR[9],
        },
        {
          text: 'Sadness',
          color: optionToShow === null || optionToShow === 10 || hoverOnCentroid === 10 ? LIGHT_COLOR[10] : DARK_COLOR[10],
        },
        {
          text: 'Dread',
          color: optionToShow === null || optionToShow === 11 || hoverOnCentroid === 11 ? LIGHT_COLOR[11] : DARK_COLOR[11],
        }
        
      ];
  
      //Define button onClick
      const handleClick = (buttonIndex) => {
        if(optionToShow !== buttonIndex){
          setOptionToShow(buttonIndex); 
          setShowAllMesh(false)
          setZoom(true)
          setFocus(centroidsArray[buttonIndex])
          setHoverOnCentroid(null)
        }else{
          setOptionToShow(null)
          setShowAllMesh(!showAllMesh)
          setZoom(false)
          setHoverOnCentroid(null)
        }
      };

      const handleHover = (buttonIndex) => {

          setHoverOnCentroid(buttonIndex)
        
      };

      const handleHoverOut = () => {


          setHoverOnCentroid(null)
        

      };
  

    
    // Update the text rotation on each frame to face the camera

    useFrame(({ camera }) => {

      if(textRefArr){
        for(let i=0; i<12; i++){

          if (textRefArr[i].current) {
            textRefArr[i].current.lookAt(camera.position)
          }
      }
      }
      
  
    });

    //const AnimatedText = motion(Text);


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
            let arrCentroids = [];

            let refArr = [];
            refArr.push(textRef0, textRef1, textRef2, textRef3, textRef4, textRef5, textRef6, textRef7, textRef8, textRef9, textRef10, textRef11)


            if(layout === 'spiral') {
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


                convexRefAmusement.current.geometry.dispose();
                convexRefIntimate.current.geometry.dispose();
                convexRefElegant.current.geometry.dispose();
                convexRefLively.current.geometry.dispose();
                convexRefSpiritual.current.geometry.dispose();
                convexRefCalmness.current.geometry.dispose();
                convexRefBoredom.current.geometry.dispose();
                convexRefStrange.current.geometry.dispose();
                convexRefMysterious.current.geometry.dispose();
                convexRefAnxiety.current.geometry.dispose();
                convexRefSadness.current.geometry.dispose();
                convexRefDread.current.geometry.dispose();


                convexRefAmusement.current.geometry = new ConvexGeometry(arrAmusement)
                convexRefIntimate.current.geometry = new ConvexGeometry(arrIntimate)
                convexRefElegant.current.geometry = new ConvexGeometry(arrElegant)
                convexRefLively.current.geometry = new ConvexGeometry(arrLively)
                convexRefSpiritual.current.geometry = new ConvexGeometry(arrSpiritual)
                convexRefCalmness.current.geometry = new ConvexGeometry(arrCalmness)
                convexRefBoredom.current.geometry = new ConvexGeometry(arrBoredom)
                convexRefStrange.current.geometry = new ConvexGeometry(arrStrange)
                convexRefMysterious.current.geometry = new ConvexGeometry(arrMysterious)
                convexRefAnxiety.current.geometry = new ConvexGeometry(arrAnxiety)
                convexRefSadness.current.geometry = new ConvexGeometry(arrSadness)
                convexRefDread.current.geometry = new ConvexGeometry(arrDread)


                arrCentroids.push(centroidRefAmusement.current = getConvexHullCentroid(convexRefAmusement.current.geometry))
                arrCentroids.push(centroidRefIntimate.current = getConvexHullCentroid(convexRefIntimate.current.geometry))
                arrCentroids.push(centroidRefElegant.current = getConvexHullCentroid(convexRefElegant.current.geometry))
                arrCentroids.push(centroidRefLively.current = getConvexHullCentroid(convexRefLively.current.geometry))
                arrCentroids.push(centroidRefSpiritual.current = getConvexHullCentroid(convexRefSpiritual.current.geometry))
                arrCentroids.push(centroidRefCalmness.current = getConvexHullCentroid(convexRefCalmness.current.geometry))
                arrCentroids.push(centroidRefBoredom.current = getConvexHullCentroid(convexRefBoredom.current.geometry))
                arrCentroids.push(centroidRefStrange.current = getConvexHullCentroid(convexRefStrange.current.geometry))
                arrCentroids.push(centroidRefMysterious.current = getConvexHullCentroid(convexRefMysterious.current.geometry))
                arrCentroids.push(centroidRefAnxiety.current = getConvexHullCentroid(convexRefAnxiety.current.geometry))
                arrCentroids.push(centroidRefSadness.current = getConvexHullCentroid(convexRefSadness.current.geometry))
                arrCentroids.push(centroidRefDread.current = getConvexHullCentroid(convexRefDread.current.geometry))


                count.current = count.current + 1
              
                if (flag.current && centroidsArray[0].x !== 0 && flag2.current && count.current < 3) {
                  flag.current = false;
                  flag2.current = false
                }else{
                  setCentroidsArray(arrCentroids)

                  setTextRefArr(refArr)
                  
                  setTimeout(() => {
                    setConvexHullLoading(false)
                  }, 500)
                  
                }
                
                }

    }, [data, layout])


    if(layout !== "spiral") return null

    return( 

        <>
          {showAllMesh ? (

            <>

            {hoverOnCentroid === null ? (
                <>
                    <mesh ref={convexRefAmusement}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={'ff3'}/>      
                      </mesh>
                      <mesh ref={convexRefIntimate}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#f88`} />
                      </mesh>

                      <mesh ref={convexRefElegant}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow}  
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#88f`} />
                      </mesh>

                      <mesh ref={convexRefLively}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#e72`} />
                      </mesh>

                      <mesh ref={convexRefSpiritual}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#4d2`} />
                      </mesh>

                      <mesh ref={convexRefCalmness}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow}  
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#3ff`} />
                      </mesh>

                      <mesh ref={convexRefBoredom}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#663`} />
                      </mesh>

                      <mesh ref={convexRefStrange}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#999`} />
                      </mesh>

                      <mesh ref={convexRefMysterious}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow}  
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#c0f`} />
                      </mesh>

                      <mesh ref={convexRefAnxiety}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#40d`} />
                      </mesh>

                      <mesh ref={convexRefSadness}>
                          <motion.meshBasicMaterial 
                                    initial={'hidden'} 
                                    animate={'visible'}
                                    variants={varShow} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#060`} />
                      </mesh>

                      <mesh ref={convexRefDread}>
                          <motion.meshBasicMaterial 
                                  initial={'hidden'} 
                                  animate={'visible'}
                                  variants={varShow} 
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                    color={`#c24`} />
                      </mesh>
                </>
              ):(
                <>
                    <mesh ref={convexRefAmusement}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 0 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={'ff3'}/>      
                      </mesh>
                      <mesh ref={convexRefIntimate}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 1 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#f88`} />
                      </mesh>

                      <mesh ref={convexRefElegant}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 2 ? varHoverStart : varHoverHide}  
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#88f`} />
                      </mesh>

                      <mesh ref={convexRefLively}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 3 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#e72`} />
                      </mesh>

                      <mesh ref={convexRefSpiritual}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 4 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#4d2`} />
                      </mesh>

                      <mesh ref={convexRefCalmness}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 5 ? varHoverStart : varHoverHide}  
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#3ff`} />
                      </mesh>

                      <mesh ref={convexRefBoredom}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 6 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#663`} />
                      </mesh>

                      <mesh ref={convexRefStrange}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 7 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#999`} />
                      </mesh>

                      <mesh ref={convexRefMysterious}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 8 ? varHoverStart : varHoverHide}  
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#c0f`} />
                      </mesh>

                      <mesh ref={convexRefAnxiety}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 9 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#40d`} />
                      </mesh>

                      <mesh ref={convexRefSadness}>
                          <motion.meshBasicMaterial 
                                    initial={'normal'} 
                                    animate={'hover'}
                                    variants={hoverOnCentroid === 10 ? varHoverStart : varHoverHide} 
                                    blending = {THREE.NormalBlending}
                                    depthTest = {false}
                                    color={`#060`} />
                      </mesh>

                      <mesh ref={convexRefDread}>
                          <motion.meshBasicMaterial 
                                  initial={'normal'} 
                                  animate={'hover'}
                                  variants={hoverOnCentroid === 11 ? varHoverStart : varHoverHide} 
                                  blending = {THREE.NormalBlending}
                                  depthTest = {false}
                                    color={`#c24`} />
                      </mesh>
                </>
              )}

              </>

          ):(
            <>
                  <mesh ref={convexRefAmusement}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 0 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 0 ? 'visible' : 'hidden'}
                                variants={optionToShow === 0 ? varShow : varHide} 
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={'ff3'}/>      
                  </mesh>
                  <mesh ref={convexRefIntimate}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 1 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 1 ? 'visible' : 'hidden'}
                                variants={optionToShow === 1 ? varShow : varHide} 
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#f88`} />
                  </mesh>

                  <mesh ref={convexRefElegant}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 2 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 2 ? 'visible' : 'hidden'}
                                variants={optionToShow === 2 ? varShow : varHide} 
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#88f`} />
                  </mesh>

                  <mesh ref={convexRefLively}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 3 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 3 ? 'visible' : 'hidden'}
                                variants={optionToShow === 3 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#e72`} />
                  </mesh>

                  <mesh ref={convexRefSpiritual}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 4 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 4 ? 'visible' : 'hidden'}
                                variants={optionToShow === 4 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#4d2`} />
                  </mesh>

                  <mesh ref={convexRefCalmness}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 5 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 5 ? 'visible' : 'hidden'}
                                variants={optionToShow === 5 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#3ff`} />
                  </mesh>

                  <mesh ref={convexRefBoredom}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 6 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 6 ? 'visible' : 'hidden'}
                                variants={optionToShow === 6 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#663`} />
                  </mesh>

                  <mesh ref={convexRefStrange}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 7 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 7 ? 'visible' : 'hidden'}
                                variants={optionToShow === 7 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#999`} />
                  </mesh>

                  <mesh ref={convexRefMysterious}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 8 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 8 ? 'visible' : 'hidden'}
                                variants={optionToShow === 8 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#c0f`} />
                  </mesh>

                  <mesh ref={convexRefAnxiety}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 9 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 9 ? 'visible' : 'hidden'}
                                variants={optionToShow === 9 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#40d`} />
                  </mesh>

                  <mesh ref={convexRefSadness}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 10 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 10 ? 'visible' : 'hidden'}
                                variants={optionToShow === 10 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#060`} />
                  </mesh>

                  <mesh ref={convexRefDread}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 11 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 11 ? 'visible' : 'hidden'}
                                variants={optionToShow === 11 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#c24`} />
                  </mesh>
              </>
          )}  


              <>
              { centroidsArray && !flag.current && count.current > 2 && textRefArr &&
              buttonConfigs.map((config, index) => (


                      <Text
                        key={index}
                        ref={textRefArr[index]}
                        position={centroidsArray[index]}
                        onClick={() => handleClick(index)}
                        //font={"Georgia,'Times New Roman', Times, serif"}
                        fontSize={hoverOnCentroid === index ? 0.33 : 0.3}
                        color={config.color}
                        anchorX="center"
                        anchorY="middle"

                        onPointerOver={() => {
                          // setHoverOnCentroid(index); 
                          handleHover(index)
                          
                        }}
                        onPointerLeave={() => {handleHoverOut()}}
                        onPointerOut={() => {handleHoverOut()}}
                        onPointerMissed={() => setHoverOnCentroid(null)}               
                          
                        // whileHover={{
                        //     scale: 1.2,
                        //     transition: { duration: 0.15 },
                        //   }}
                      >
                        {config.text}
                      </Text>

                      )
                      )}
              
              </>
        </>

    )

}

export default ConvexHull;


function getConvexHullCentroid(geometry) {

  const positions = geometry.attributes.position.array;
  const numVertices = positions.length / 3;

  let convexHullIndices = [];

    // Assume all vertices are part of the convex hull
    for (let i = 0; i < numVertices; i++) {
      convexHullIndices.push(i);
    }
  

  let centroid = new THREE.Vector3();
  let numPoints = 0;

  // Calculate the centroid of the points that make up the convex hull
  for (let i = 0; i < numVertices; i++) {
    if (convexHullIndices.includes(i)) {
      const position = new THREE.Vector3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      centroid.add(position);
      numPoints++;
    }
  }

  if (numPoints > 0) {
    centroid.divideScalar(numPoints);
  }

  return centroid;
}


