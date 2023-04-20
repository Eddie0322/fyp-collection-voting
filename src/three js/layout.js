import { useRef, useEffect } from "react";
import { useSpring, config } from 'react-spring';


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

function getRandomPointArray(n, minDistance) {
  const arr = [];
  while (arr.length < n) {
    const x = (Math.random() * 1.5) + 0;
    const y = (Math.random() * 1.5) + 0;
    const z = (Math.random() * 1.5) + 0;
    const point = {x, y, z};
    let isDuplicate = false;
    for (const p of arr) {
      const dist = Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2 + (p.z - point.z) ** 2);
      if (dist < minDistance) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      arr.push(point);
    }
  }
  return arr;
}


function spiralLayout(data){
  let unvotedData = []
  let PCApos = [];
  let PCAposDup = [];
  let PCAMod = [];
  let minDistance = 0.7
  let theta = 0;

  for (let i = 0; i < data.length; ++i) {
      const datum = data[i];

    if( datum.totalVote !== 0 ){
      PCApos.push(datum)

    } else {
       unvotedData.push(datum)
    }
  }

  for(let i = 0; i < unvotedData.length; i++ ){
    const phi = Math.PI * (Math.sqrt(5) - 1)
    const y = 1 - (i / (unvotedData.length - 1) * 2)
    const radius = Math.sqrt(1 - y * y) * 1;
    theta = phi * i;
    data[unvotedData[i].id].y = y * 1.5 ;
    data[unvotedData[i].id].x = radius * Math.cos(theta) * 1.5 ;
    data[unvotedData[i].id].z = radius * Math.sin(theta) * 1.5 ;
  }
  
  for (let j = 0; j < PCApos.length; j++){
    for (let k = 0; k < PCApos.length ; k++){
      if(
        PCApos[j].PCAx === PCApos[k].PCAx &&
        PCApos[j].PCAy === PCApos[k].PCAy &&
        PCApos[j].PCAz === PCApos[k].PCAz &&
        j !== k
      ){
        if(!PCAposDup.includes(PCApos[j].id)){
          PCAposDup.push(PCApos[j].id)
        }
      }
    }

  }

  PCAMod = getRandomPointArray(PCAposDup.length, minDistance)
  let indicator = 0;
  for (let j = 0; j < PCApos.length; j++){
    if(PCAposDup.includes(PCApos[j].id)){
      data[PCApos[j].id].x = (PCApos[j].PCAx + PCAMod[indicator].x) * 0.3 + 4
      data[PCApos[j].id].y = (PCApos[j].PCAy + PCAMod[indicator].y) * 0.3 + 4
      data[PCApos[j].id].z = (PCApos[j].PCAz + PCAMod[indicator].z) * 0.3 + 4
      indicator = indicator + 1
    }else{
      data[PCApos[j].id].x = PCApos[j].PCAx * 0.3 + 4
      data[PCApos[j].id].y = PCApos[j].PCAy * 0.3 + 4
      data[PCApos[j].id].z = PCApos[j].PCAz * 0.3 + 4
    }
     
  }
  console.log(PCAposDup)

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
    config: { tension: 80, friction: 16 },
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

  