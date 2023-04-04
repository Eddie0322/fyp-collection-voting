import { useRef, useEffect } from "react";
import { useSpring } from 'react-spring';


function gridLayout(data){

    const numPoints = data.length;
    let i = 0;
    //const datum = data[i];
    for (let x = 0; x < (numPoints/100); x += 1){
        for (let y = 0; y < (numPoints/100); y += 1){
          for (let z = 0; z < (numPoints/100); z += 1){
            const datum = data[i];
            i += 1;
            datum.y = y+1;
            datum.x = x;
            datum.z = z;
            //data[i] = {x, y, z};
          }
        }
    }
}


// function spiralLayout(data){
//     let theta = 0;
//     for (let i = 0; i < data.length; ++i) {
//         const datum = data[i];
//         const phi = Math.PI * (3 - Math.sqrt(5))

//         const y = 1 - (i / (data.length - 1) * 2)
//         const radius = Math.sqrt(1 - y*y) * 12;
//         theta = phi * i;
//         datum.y = y;
//         datum.x = radius * Math.cos(theta);
//         datum.z = radius * Math.sin(theta);
        
//       }
// }

function spiralLayout(data){
  for (let i = 0; i < data.length; ++i) {
      const datum = data[i];

      datum.y = data[i].PCAy*0.45;
      datum.x = data[i].PCAx*0.45;
      datum.z = data[i].PCAz*0.45;
      
    }
}

export const useLayout = ({ data, layout = 'grid'}) => {
    useEffect(() => {
        switch (layout) {
            case 'spiral':
                spiralLayout(data);
                break;
            case 'grid':
                default: {
                    gridLayout(data);
                }
        }
    }, [data, layout]);
};


function useSourceTargetLayout({ data, layout }) {
  // prep for new animation by storing source
  useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
    }
  }, [data, layout]);

  // run layout
  useLayout({ data, layout });

  // store target
  useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].targetX = data[i].x;
      data[i].targetY = data[i].y;
      data[i].targetZ = data[i].z;
    }
  }, [data, layout]);
}

function interpolateSourceTarget(data, progress) {
  for (let i = 0; i < data.length; ++i) {
    data[i].x = (1 - progress) * data[i].sourceX + progress * data[i].targetX;
    data[i].y = (1 - progress) * data[i].sourceY + progress * data[i].targetY;
    data[i].z = (1 - progress) * data[i].sourceZ + progress * data[i].targetZ;
  }
}

export function useAnimatedLayout({ data, layout, onFrame }) {
  // compute layout remembering initial position as source and
  // end position as target

  //console.log(layout);
  useSourceTargetLayout({ data, layout });

  // do the actual animation when layout changes
  const prevLayout = useRef(layout);
  useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: layout !== prevLayout.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      interpolateSourceTarget(data, animationProgress);
      // callback to indicate data has updated
      onFrame({ animationProgress });
    },
  });
  prevLayout.current = layout;
}

  