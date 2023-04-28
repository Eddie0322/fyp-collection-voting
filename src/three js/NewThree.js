import { Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Object3D } from "three";
import {  useAnimatedLayout } from "./layout";
import CameraControls from 'camera-controls'
import Lines from "./Lines";
import ConvexHull from "./ConvexHull";
import { UserAuth } from '../AuthContext';
import CentroidButton from "./CentroidButton";


CameraControls.install({ THREE })

const tempObject = new Object3D();
const loadingElement = <div id="preloader"></div>;


//camera
function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3(), optionToShow, selectedPoint }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])

  useEffect(() => {
    if(!zoom){
      controls.setPosition(13, 13, 13, true)
    }else{
      if(optionToShow === null){
        controls.setPosition(focus.x + 1.5, focus.y + 1.5, focus.z + 2, true)
      }else{
          controls.setPosition(focus.x + 3, focus.y + 3, focus.z + 3.5, true)
      }
      
    }
  }, [zoom, focus])

  controls.mouseButtons.right = CameraControls.ACTION.NONE
  controls.maxDistance = 15
  controls.minDistance = 2.5
  
  
  return useFrame((state, delta) => {
    //zoom ? pos.set(focus.x + 1.5, focus.y + 1.5, focus.z + 3.5) : pos.set(15, 15, 15)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set( 5, 5, 5)


    // state.camera.position.set(pos)
    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    //controls.setPosition(state.camera.position.x, state.camera.position.y, state.camera.position.z, true)
    controls.setTarget(look.x, look.y, look.z, true)
    //
    return controls.update(delta)
  })
}


//update
function UpdateInstancedMeshMatrices({ mesh, data, selectedPoint, hoverPoint }) {
    if (!mesh) return;
    // set the transform matrix for each instance
    for (let i = 0; i < data.length; ++i) {
      const { x, y, z } = data[i]; 
  
      tempObject.position.set(x, y, z);


      if(data[i].totalVote !== 0) {

                  if (data[i] === selectedPoint) {
                    tempObject.scale.set(2.5, 2.5, 2.5);
                    //console.log(data[i])
                  } else if(data[i] === hoverPoint) {
                    tempObject.scale.set(2, 2, 2);
                  } else {
                    tempObject.scale.set(1, 1, 1);
                  }

            }

       else {

                  if (data[i] === selectedPoint) {
                    tempObject.scale.set(2.5, 2.5, 2.5);
                  } else if(data[i] === hoverPoint) {
                    tempObject.scale.set(0.6, 0.6, 0.6);
                  } else {
                    tempObject.scale.set(0.3, 0.3, 0.3);
                  }

      }



      tempObject.updateMatrix(); 
      mesh.setMatrixAt(i, tempObject.matrix);
    }
  
    //mesh.rotation.y = Math.PI / 2
    mesh.instanceMatrix.needsUpdate = true;

  
}


//Color settings
const SELECTED_COLOR = '#6c6';
const DEFAULT_COLOR_ORIGIN = '#fff'
const VOTED_BY_USER_COLOR = '#d53'
const DEFAULT_COLOR = ["#ff3", "#f88", "#88f", "#e72", "#4d2", "#3ff", "#663", "#999", "#c0f", "#40d", "#060", "#c24"]

//re-use for instance computations
const scratchColor = new THREE.Color();

const usePointColors = ({ data, selectedPoint, layout, hoverPoint, user, userVotes }) => {

    const numPoints = data.length;
    const layoutSelected = useRef();
    const colorAttrib = useRef();
    const colorArray = useMemo(() => new Float32Array(numPoints*3), [numPoints]);

    layoutSelected.current = layout;

    useEffect(() => {
  
      if (layoutSelected.current === "spiral"){

          for (let i = 0; i < data.length; ++i) {

                    if (data[i] === (selectedPoint)) {

                      scratchColor.set(SELECTED_COLOR)

                    } else if (data[i].totalVote === 0) {

                      scratchColor.set(DEFAULT_COLOR_ORIGIN)

                    } else  {

                      scratchColor.set(DEFAULT_COLOR[data[i].Label])

                    }

                  scratchColor.toArray(colorArray, i*3);
              }
                    
            }

       else {

          for (let i = 0; i < data.length; ++i) {

                if(user && userVotes.includes(i)){
                     scratchColor.set(data[i] === (selectedPoint) ? SELECTED_COLOR : VOTED_BY_USER_COLOR);
                }else{
                     scratchColor.set(data[i] === (selectedPoint) ? SELECTED_COLOR : DEFAULT_COLOR_ORIGIN);
                }
                
                scratchColor.toArray(colorArray, i*3);

          }    

      }
      colorAttrib.current.needsUpdate = true;
    }, [data, selectedPoint, colorArray, layout, hoverPoint, user, userVotes]);
   
    return {colorAttrib, colorArray};
};


//Mouse interaction
const useMousePointInteraction = ({ 
                          data, 
                          selectedPoint, 
                          onSelectPoint, 
                          storeSelectedPoint,
                          hoverPoint, 
                          onHoverPoint, 
                          setOpenModal, 
                          setOpenVote, 
                          zoomToView, 
                          setZoom,
                          optionToShow,
                          setOptionToShow,
                          setShowAllMesh

                           }) => {
     
      //Track mouse down position to skip click handlers on drags
      const mouseDownRef = useRef([0,0]);

      const handlePointerDown = e =>{
        mouseDownRef.current[0] = e.clientX;
        mouseDownRef.current[1] = e.clientY;
      };

      const handleClick = event => {
        //index is instanceId if we never change sort order
        const { instanceId, clientX, clientY } = event;  

        const downDistance = Math.sqrt(
          Math.pow(mouseDownRef.current[0] - clientX, 2) +
          Math.pow(mouseDownRef.current[1] - clientY, 2)
      );

      //Skip click if we dragged more than 5px distance
      if (downDistance > 5){
        event.stopPropagation();
        return;
      };
      
      const index = instanceId;
      const point = data[index];
      //console.log(point)
        
          // toggle the point
          if (point === selectedPoint){
                storeSelectedPoint.current = null;
                onSelectPoint(null)
                setOpenModal(false);
          } else {

              if(point.Label === optionToShow){
                storeSelectedPoint.current = index
                    onSelectPoint(point)
                    setZoom(true)
                    zoomToView(point)
                    setTimeout(() => {
                      setOpenModal(true);
                      setOpenVote(false);
                    }, 500)
              } else {
                storeSelectedPoint.current = index
                    onSelectPoint(point)
                    setZoom(true)
                    zoomToView(point)
                    setOptionToShow(null)
                    setShowAllMesh(true)
                    setTimeout(() => {
                      setOpenModal(true);
                      setOpenVote(false);
                    }, 500)
              }
                
                
          }
    };

      //Hover Points
      const handlePointerOver = evt => {
          const { instanceId } = evt;
          const index = instanceId;
          const point = data[index];

          if (point === hoverPoint) {
            onHoverPoint(null);
          }else{
            onHoverPoint(point)
          }
    }

    const handlePointerOut = evt => {
      const { instanceId } = evt;
      const index = instanceId;
      const point = data[index];

      if (point === hoverPoint) {
        onHoverPoint(null);
      }else{
        onHoverPoint(point)
      }
}


      return { handlePointerDown, handleClick , handlePointerOver, handlePointerOut}; 
};



//create instanced points and return a canvas for rendering
const InstancedPoints = ({
        data, 
        layout, 
        selectedPoint, 
        onSelectPoint, 
        hoverPoint, 
        onHoverPoint, 
        setOpenModal, 
        setOpenVote, 
        zoomToView,
        zoom,
        setZoom,
        storeSelectedPoint,
        updatePosLoading,
        setIsVoteByUser,
        isVoteByUser,
        user,
        userVotes,
        optionToShow,
        setOptionToShow,
        setShowAllMesh
      }) => {

    const numPoints = data.length;
    const meshRef = useRef();
    
    // run the layout, animating on change   
    useAnimatedLayout({
      data,
      layout,
      onFrame: () => {
        UpdateInstancedMeshMatrices({ mesh: meshRef.current, data, selectedPoint, hoverPoint });
      },
    });
  
    // update instance matrices only when needed
    useEffect(() => {
      
        if(!updatePosLoading){

                if(storeSelectedPoint.current !== null && isVoteByUser){

                  const point = data[storeSelectedPoint.current];
                  if(point !== selectedPoint){
                          onSelectPoint(point);
                          setZoom(true)
                          zoomToView(point)

                          //See if the selected point is outside the current selected cluster
                          if(point.Label !== optionToShow){
                                  setOptionToShow(null)
                                  setShowAllMesh(true)
                            }

                          setTimeout(() => {
                              setOpenModal(true);
                              setOpenVote(false);
                        }, 1000)
                          setIsVoteByUser(false);
                  }

                } else if (storeSelectedPoint.current !== null && !isVoteByUser && !zoom){

                        const point = data[storeSelectedPoint.current];
                        
                        if(point !== selectedPoint){
                                onSelectPoint(point);

                                //See if the selected point is outside the current selected cluster
                                if(point.Label !== optionToShow){
                                    setOptionToShow(null)
                                    setShowAllMesh(true)
                                }
                        }

                } else if (storeSelectedPoint.current !== null && !isVoteByUser && zoom){

                        const point = data[storeSelectedPoint.current];
                        if(point !== selectedPoint){
                                onSelectPoint(point);
                                setZoom(true)
                                zoomToView(point)

                                //See if the selected point is outside the current selected cluster
                                if(point.Label !== optionToShow){
                                    setOptionToShow(null)
                                    setShowAllMesh(true)
                                }
                        }
                }
                 
                  UpdateInstancedMeshMatrices({ mesh: meshRef.current, data, selectedPoint, hoverPoint });

      }

    }, [data, selectedPoint, hoverPoint, updatePosLoading]);

    // Color settings
    const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint, layout, hoverPoint, user, userVotes });

    // Mouse interaction settings
    const { handleClick, handlePointerDown, handlePointerOver, handlePointerOut } = useMousePointInteraction({
      data,
      selectedPoint,
      onSelectPoint,
      storeSelectedPoint,
      hoverPoint,
      onHoverPoint,
      setOpenModal,
      setOpenVote,
      zoomToView,
      setZoom,
      optionToShow,
      setOptionToShow,
      setShowAllMesh
    });

    
    return (
        <instancedMesh 
          ref={meshRef} 
          args={[null, null, numPoints]} 
          frustumCulled={false}
          onClick={handleClick}
          onPointerDown={handlePointerDown} 
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          >
          <sphereGeometry args={[0.12, 32, 32]}>
            <instancedBufferAttribute
              ref={colorAttrib}
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </sphereGeometry>
          <meshBasicMaterial 
              attach = "material"
              vertexColors
            />
        </instancedMesh>
      );
};


const Scene = ({ data, 
                 layout, 
                 setLayout,
                 selectedPoint, 
                 onSelectPoint, 
                 hoverPoint, 
                 onHoverPoint, 
                 setOpenModal, 
                 setOpenVote, 
                 loading, 
                 collection_data_loading, 
                 zoom,
                 setZoom,
                 focus,
                 setFocus,
                 zoomToView,
                 storeSelectedPoint,
                 updatePosLoading,
                 setIsVoteByUser,
                 isVoteByUser,

                 optionToShow,
                 setOptionToShow,
                 showAllMesh,
                 setShowAllMesh,

                 centroidsArray,
                 setCentroidsArray

                 }) => {
    

    const { user, userVotes } = UserAuth()
    const arrColor = ["#ff3", "#f88", "#88f", "#e72", "#4d2", "#3ff", "#663", "#999", "#c0f", "#40d", "#060", "#c24"]
    const originPos = {x: 0, y: 0, z: 0}

    // Define an array of button configurations
    const buttonConfigs = [
      {
        position: centroidsArray ? centroidsArray[0] : originPos,
        text: 'Amusement',
        color: arrColor[0],
      },
      {
        position: centroidsArray ? centroidsArray[1] : originPos,
        text: 'Intimate',
        color: arrColor[1],
      },
      {
        position: centroidsArray ? centroidsArray[2] : originPos,
        text: 'Elegant',
        color: arrColor[2],
      },
      {
        position: centroidsArray ? centroidsArray[3] : originPos,
        text: 'Lively',
        color: arrColor[3],
      },
      {
        position: centroidsArray ? centroidsArray[4] : originPos,
        text: 'Spiritual',
        color: arrColor[4],
      },
      {
        position: centroidsArray ? centroidsArray[5] : originPos,
        text: 'Calmness',
        color: arrColor[5],
      },
      {
        position: centroidsArray ? centroidsArray[6] : originPos,
        text: 'Boredom',
        color: arrColor[6],
      },
      {
        position: centroidsArray ? centroidsArray[7] : originPos,
        text: 'Strange',
        color: arrColor[7],
      },
      {
        position: centroidsArray ? centroidsArray[8] : originPos,
        text: 'Mysterious',
        color: arrColor[8],
      },
      {
        position: centroidsArray ? centroidsArray[9] : originPos,
        text: 'Anxiety',
        color: arrColor[9],
      },
      {
        position: centroidsArray ? centroidsArray[10] : originPos,
        text: 'Sadness',
        color: arrColor[10],
      },
      {
        position: centroidsArray ? centroidsArray[11] : originPos,
        text: 'Dread',
        color: arrColor[11],
      }
      
    ];

    //Define button onClick
    const handleClick = (buttonIndex) => {
      if(optionToShow !== buttonIndex){
        setOptionToShow(buttonIndex); 
        setShowAllMesh(false)
        setZoom(true)
        setFocus(centroidsArray[buttonIndex])

      }else{
        setOptionToShow(null)
        setShowAllMesh(!showAllMesh)
        setZoom(false)
      }
    };



    //Return components for rendering
    if(loading || collection_data_loading){

      return loadingElement

    } else {

      //console.log(data)

    return(
        <Canvas style={{ background: "black" }} camera={{ position: [25, 25, 25] }}>

            {/* <primitive object={new THREE.AxesHelper(10)} /> */}

            <Float       
                speed={0.5}
                rotationIntensity={0.4}
                floatIntensity={0.6}>


                <InstancedPoints 
                    data = {data} 
                    layout = {layout}
                    selectedPoint = {selectedPoint}
                    onSelectPoint = {onSelectPoint} 
                    hoverPoint = {hoverPoint}
                    onHoverPoint = {onHoverPoint}
                    setOpenModal = {setOpenModal}
                    setOpenVote = {setOpenVote}
                    zoomToView = {zoomToView}
                    setZoom = {setZoom}
                    zoom = {zoom}
                    storeSelectedPoint = {storeSelectedPoint}
                    setLayout = {setLayout}
                    updatePosLoading = {updatePosLoading}
                    setIsVoteByUser = {setIsVoteByUser}
                    isVoteByUser = {isVoteByUser} 

                    optionToShow = {optionToShow}
                    setOptionToShow = {setOptionToShow}
                    setShowAllMesh = {setShowAllMesh}
             
                    user = {user}
                    userVotes = {userVotes}
                    // zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
                />

                
                {buttonConfigs.map((config, index) => (
                  <CentroidButton
                    key={index}
                    position={config.position}
                    text={config.text}
                    color={config.color}
                    onClick={() => handleClick(index)}
                  />
                ))}

                <Lines 
                    data = {data}
                    layout= {layout}

                    optionToShow = {optionToShow}
                    showAllMesh = {showAllMesh}

                />


                <ConvexHull
                    data = {data}
                    layout= {layout}

                    optionToShow = {optionToShow}
                    showAllMesh = {showAllMesh}

                    setCentroidsArray = {setCentroidsArray}
                />
                
                
                

            </Float>



            <Controls zoom={zoom} focus={focus} optionToShow={optionToShow} selectedPoint={selectedPoint}/>

            <ambientLight />




        </Canvas> 
    );
    
    }
}

export default Scene;