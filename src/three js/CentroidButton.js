import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef } from "react";
import { motion } from 'framer-motion-3d'

function CentroidButton({ position, onClick, text, color, setHoverOnCentroid, id }) {
    const textRef = useRef();


    // Update the text rotation on each frame to face the camera
    useFrame(({ camera }) => {
        if (textRef.current) {
            textRef.current.lookAt(camera.position);
            
          }
    });

    const AnimatedText = motion(Text);
  
    return (
      <AnimatedText
        layout
        ref={textRef}
        position={[position.x, position.y, position.z]}
        onClick={onClick}
        //font={"Georgia,'Times New Roman', Times, serif"}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        whileHover={{
            scale: 1.2,
            transition: { duration: 0.15 },
          }}
        onPointerOver={() => setHoverOnCentroid(id)}
        onPointerOut={() => setHoverOnCentroid(null)}
      >
         {text}
      </AnimatedText>
    );
}

export default CentroidButton;