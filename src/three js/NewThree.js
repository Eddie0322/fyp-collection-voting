import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, } from "@react-three/fiber";
//import { hover } from "@testing-library/user-event/dist/hover";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Object3D } from "three";
import {  useAnimatedLayout } from "./layout";


const tempObject = new Object3D();
const loadingElement = <div id="preloader"></div>;

//update
function UpdateInstancedMeshMatrices({ mesh, data, selectedPoint, hoverPoint }) {
    if (!mesh) return;
    // set the transform matrix for each instance
    for (let i = 0; i < data.length; ++i) {
      const { x, y, z } = data[i]; 
  
      tempObject.position.set(x, y, z);
      if(data[i] === selectedPoint){
        tempObject.scale.set(3.5, 3.5, 3.5);
      }else if(data[i] === hoverPoint){
        tempObject.scale.set(2, 2, 2);
      }else{
        tempObject.scale.set(1, 1, 1);
      }
      //tempObject.scale.set(1, 1, 1);
      tempObject.updateMatrix(); 
      mesh.setMatrixAt(i, tempObject.matrix);
    }
  
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
          scratchColor.set(data[i] === (selectedPoint) ? SELECTED_COLOR : DEFAULT_COLOR[data[i].Label]);
          //scratchColor.set(data[i] === hoverPoint ? SELECTED_COLOR : DEFAULT_COLOR[data[i].Label]);
          scratchColor.toArray(colorArray, i*3);
        }
      }else{
        for (let i = 0; i < data.length; ++i) {
          scratchColor.set(data[i] === (selectedPoint) ? SELECTED_COLOR : DEFAULT_COLOR_ORIGIN);
          //scratchColor.set(data[i] === hoverPoint ? SELECTED_COLOR : DEFAULT_COLOR_ORIGIN);
          scratchColor.toArray(colorArray, i*3);
        }    
      }
      colorAttrib.current.needsUpdate = true;
    }, [data, selectedPoint, colorArray, layout, hoverPoint]);

    //console.log(colorArray)
    return {colorAttrib, colorArray};
};


//Mouse interaction
const useMousePointInteraction = ({ data, selectedPoint, onSelectPoint, hoverPoint, onHoverPoint, setOpenModal, setOpenVote }) => {
     
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
        
          // toggle the point
          if (point === selectedPoint){
                onSelectPoint(null);
                setOpenModal(false);
          } else {
                onSelectPoint(point);
                setOpenModal(true);
                setOpenVote(false);
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
        storeSelected,
      }) => {

    const numPoints = data.length;
    const meshRef = useRef();
    //const storeSelected = useRef();
    
    // run the layout, animating on change   
    useAnimatedLayout({
      data,
      layout,
      onFrame: () => {
        UpdateInstancedMeshMatrices({ mesh: meshRef.current, data, selectedPoint, hoverPoint });
      },
    });

    // Select point after voting
    useEffect(() => {
      onSelectPoint(data[storeSelected.id])
    }, [storeSelected]) 
  
    // update instance matrices only when needed
    useEffect(() => {
      UpdateInstancedMeshMatrices({ mesh: meshRef.current, data, selectedPoint, hoverPoint });
    }, [data, layout, selectedPoint, hoverPoint]);

    // Color settings
    const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint, layout, hoverPoint });

    // Mouse interaction settings
    const { handleClick, handlePointerDown, handlePointerOver, handlePointerOut } = useMousePointInteraction({
      data,
      selectedPoint,
      onSelectPoint,
      hoverPoint,
      onHoverPoint,
      setOpenModal,
      setOpenVote
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
                 selectedPoint, 
                 onSelectPoint, 
                 hoverPoint, 
                 onHoverPoint, 
                 setOpenModal, 
                 setOpenVote, 
                 loading, 
                 collection_value_loading, 
                 storeSelected,
                 }) => {
    
    //console.log(data[0]);

    if(loading || collection_value_loading){

      return loadingElement

    } else {

      //console.log(data);

    return(
        <Canvas style={{ background: "black" }} >
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            <OrbitControls
                  target={[5 ,5 ,5 ]}
                  // minAzimuthAngle={-Math.PI / 18}
                  // maxAzimuthAngle={Math.PI / 2}
                  // minPolarAngle={Math.PI / 6}
                  // maxPolarAngle={Math.PI - Math.PI / 6}
            />
            <PerspectiveCamera makeDefault fov={75} position={[5, 5, 20]}/>
            <ambientLight />
            <InstancedPoints 
                data = {data} 
                layout = {layout}
                selectedPoint = {selectedPoint}
                onSelectPoint = {onSelectPoint} 
                hoverPoint = {hoverPoint}
                onHoverPoint = {onHoverPoint}
                setOpenModal = {setOpenModal}
                setOpenVote = {setOpenVote}
                storeSelected = {storeSelected}
                />
            
        </Canvas> 
    );
    
    }
}

export default Scene;