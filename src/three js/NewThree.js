import { OrbitControls, PerspectiveCamera, Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
//import { hover } from "@testing-library/user-event/dist/hover";
import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { Object3D } from "three";
import {  useAnimatedLayout } from "./layout";
import CameraControls from 'camera-controls'
import Lines from "./Lines";


CameraControls.install({ THREE })

const tempObject = new Object3D();
const loadingElement = <div id="preloader"></div>;


//camera
function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])

  useEffect(() => {
    if(!zoom){
      controls.setPosition(13, 13, 13, true)
    }else{
      controls.setPosition(focus.x + 1.5, focus.y + 1.5, focus.z + 2, true)
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
                    tempObject.scale.set(3.5, 3.5, 3.5);
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
const DEFAULT_COLOR = ["#ff3", "#05d", "#88f", "#e72", "#e33", "#c0f", "#3ff", "#0c0", "#663", "#777", "#933", "#ccc"]

//re-use for instance computations
const scratchColor = new THREE.Color();

const usePointColors = ({ data, selectedPoint, layout, hoverPoint }) => {
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

                    scratchColor.set(data[i] === (selectedPoint) ? SELECTED_COLOR : DEFAULT_COLOR_ORIGIN);
                    scratchColor.toArray(colorArray, i*3);

          }    

      }
      colorAttrib.current.needsUpdate = true;
    }, [data, selectedPoint, colorArray, layout, hoverPoint]);

    //console.log(colorArray)
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
                          setZoom }) => {
     
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
                storeSelectedPoint.current = index
                onSelectPoint(point)
                setZoom(true)
                zoomToView(point)
                setTimeout(() => {
                  setOpenModal(true);
                  setOpenVote(false);
                }, 500)
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
        setLayout,
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
        isVoteByUser
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
                        }

                } else if (storeSelectedPoint.current !== null && !isVoteByUser && zoom){

                        const point = data[storeSelectedPoint.current];
                        if(point !== selectedPoint){
                                onSelectPoint(point);
                                setZoom(true)
                                zoomToView(point)
                        }
                }
                 
                  UpdateInstancedMeshMatrices({ mesh: meshRef.current, data, selectedPoint, hoverPoint });

      }

    }, [data, layout, selectedPoint, hoverPoint, updatePosLoading]);

    // Color settings
    const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint, layout, hoverPoint });

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
      setZoom
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
          <sphereGeometry args={[0.1, 32, 32]}>
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
                 collection_value_loading, 
                 zoom,
                 setZoom,
                 focus,
                 zoomToView,
                 storeSelectedPoint,
                 updatePosLoading,
                 setIsVoteByUser,
                 isVoteByUser
                 }) => {
    
    //console.log(data[0]);
    // const [zoom, setZoom] = useState(false)
    // const [focus, setFocus] = useState({})


    if(loading || collection_value_loading){

      return loadingElement

    } else {

      //console.log(data);

    return(
        <Canvas style={{ background: "black" }} camera={{ position: [25, 25, 25] }}>

            <primitive object={new THREE.AxesHelper(10)} />

            {/* <OrbitControls
                  target={[5 ,5 ,5 ]}
                  // minAzimuthAngle={-Math.PI / 18}
                  // maxAzimuthAngle={Math.PI / 2}
                  // minPolarAngle={Math.PI / 6}
                  // maxPolarAngle={Math.PI - Math.PI / 6}
            /> */}
            {/* <PerspectiveCamera makeDefault fov={75} position={[5, 5, 20]}/> */}

            <Controls zoom={zoom} focus={focus} />

            <ambientLight />

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
                    // zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
                />

                <Lines 
                    data = {data}
                    layout= {layout}
                />

            </Float>




        </Canvas> 
    );
    
    }
}

export default Scene;