import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion-3d"

const ConvexHull = ({
                      data, 
                      layout,
                      optionToShow,
                      showAllMesh
                    }) => {


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


    const varShow = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 0.2, 
        transition: {
            delay: 1,
            duration: 1.5
      } },
    }

    const varHide = {
      visible: { opacity: 0.2 },
      hidden: { 
        opacity: 0, 
        transition: {
            delay: 1,
            duration: 1.5
      } },
    }
    


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

                }


    }, [data, layout])


    if(layout === "grid") return null

    return( 

        <>
          {showAllMesh ? (
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
                                initial={optionToShow === 1 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 1 ? 'visible' : 'hidden'}
                                variants={optionToShow === 1 ? varShow : varHide} 
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={'ff3'}/>      
                  </mesh>
                  <mesh ref={convexRefIntimate}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 2 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 2 ? 'visible' : 'hidden'}
                                variants={optionToShow === 2 ? varShow : varHide} 
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#f88`} />
                  </mesh>

                  <mesh ref={convexRefElegant}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 3 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 3 ? 'visible' : 'hidden'}
                                variants={optionToShow === 3 ? varShow : varHide} 
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#88f`} />
                  </mesh>

                  <mesh ref={convexRefLively}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 4 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 4 ? 'visible' : 'hidden'}
                                variants={optionToShow === 4 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#e72`} />
                  </mesh>

                  <mesh ref={convexRefSpiritual}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 5 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 5 ? 'visible' : 'hidden'}
                                variants={optionToShow === 5 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#4d2`} />
                  </mesh>

                  <mesh ref={convexRefCalmness}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 6 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 6 ? 'visible' : 'hidden'}
                                variants={optionToShow === 6 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#3ff`} />
                  </mesh>

                  <mesh ref={convexRefBoredom}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 7 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 7 ? 'visible' : 'hidden'}
                                variants={optionToShow === 7 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#663`} />
                  </mesh>

                  <mesh ref={convexRefStrange}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 8 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 8 ? 'visible' : 'hidden'}
                                variants={optionToShow === 8 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#999`} />
                  </mesh>

                  <mesh ref={convexRefMysterious}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 9 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 9 ? 'visible' : 'hidden'}
                                variants={optionToShow === 9 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#c0f`} />
                  </mesh>

                  <mesh ref={convexRefAnxiety}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 10 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 10 ? 'visible' : 'hidden'}
                                variants={optionToShow === 10 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#40d`} />
                  </mesh>

                  <mesh ref={convexRefSadness}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 11 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 11 ? 'visible' : 'hidden'}
                                variants={optionToShow === 11 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#060`} />
                  </mesh>

                  <mesh ref={convexRefDread}>
                      <motion.meshBasicMaterial 
                                initial={optionToShow === 12 ? 'hidden' : 'visible'} 
                                animate={optionToShow === 12 ? 'visible' : 'hidden'}
                                variants={optionToShow === 12 ? varShow : varHide}  
                                blending = {THREE.NormalBlending}
                                depthTest = {false}
                                color={`#c24`} />
                  </mesh>
              </>
          )}  
        </>
    )

}

export default ConvexHull;