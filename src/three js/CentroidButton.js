import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef } from "react";

function CentroidButton({ position, onClick, text, color }) {
    const textRef = useRef();

    // Update the text rotation on each frame to face the camera
    useFrame(({ camera }) => {
        if (textRef.current) {
            textRef.current.lookAt(camera.position);
            
          }
    });
  
    return (
      <Text
        ref={textRef}
        position={[position.x, position.y, position.z]}
        onClick={onClick}
        // font="'Georgia','TimesNewRoman',Times,serif"
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
         {text}
      </Text>
    );
}

export default CentroidButton;