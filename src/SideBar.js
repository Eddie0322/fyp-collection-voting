import './App.css';

const SideBar = ({

                    optionToShow, 
                    setOptionToShow, 
                    showAllMesh, 
                    setShowAllMesh, 
                    setZoom, 
                    zoom, 
                    setFocus, 
                    centroidsArray

                  }) => {

    return(
        <div className='sideBar'>
                    <button onClick={() => {
                                            
                                            if(optionToShow !== 0){
                                              setOptionToShow(0); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[0])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Amusement</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 1){
                                              setOptionToShow(1); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[1])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Intimate</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 2){
                                              setOptionToShow(2); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[2])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Elegant</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 3){
                                              setOptionToShow(3); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[3])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Lively</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 4){
                                              setOptionToShow(4); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[4])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Spiritual</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 5){
                                              setOptionToShow(5); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[5])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Calmness</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 6){
                                              setOptionToShow(6); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[6])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Boredom</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 7){
                                              setOptionToShow(7); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[7])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Strange</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 8){
                                              setOptionToShow(8); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[8])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Mysterious</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 9){
                                              setOptionToShow(9); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[9])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Anxiety</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 10){
                                              setOptionToShow(10); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[10])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Sadness</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 11){
                                              setOptionToShow(11); 
                                              setShowAllMesh(false)
                                              setZoom(true)
                                              setFocus(centroidsArray[11])

                                            }else{
                                              setOptionToShow(null)
                                              setShowAllMesh(!showAllMesh)
                                              setZoom(false)
                                            }
                                            
                                          }}>Dread</button>
                    
                    <button onClick={() => {
                                            
                                              setOptionToShow(null)
                                              setShowAllMesh(true)
                                              setZoom(!zoom)
                                              setFocus({x: 0, y: 0, z: 0})

                                            
                                            
                                          }}>Unvoted</button>

                    <button onClick={() => {
                                            
                                              setOptionToShow(null)
                                              setShowAllMesh(true)
                                              setZoom(false)

                                            }
                                            
                                          }>Show All</button>
        </div>
    )

}

export default SideBar