import './App.css';

const SideBar = ({optionToShow, setOptionToShow, showAllMesh, setShowAllMesh}) => {

    return(
        <div className='sideBar'>
                    <button onClick={() => {
                                            
                                            if(optionToShow !== 1){
                                              setOptionToShow(1); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Amusement</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 2){
                                              setOptionToShow(2); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Intimate</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 3){
                                              setOptionToShow(3); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Elegant</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 4){
                                              setOptionToShow(4); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Lively</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 5){
                                              setOptionToShow(5); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Spiritual</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 6){
                                              setOptionToShow(6); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Calmness</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 7){
                                              setOptionToShow(7); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Boredom</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 8){
                                              setOptionToShow(8); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Strange</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 9){
                                              setOptionToShow(9); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Mysterious</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 10){
                                              setOptionToShow(10); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Anxiety</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 11){
                                              setOptionToShow(11); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Sadness</button>

                    <button onClick={() => {
                                            
                                            if(optionToShow !== 12){
                                              setOptionToShow(12); 
                                              setShowAllMesh(false)
                                            }else{
                                              setShowAllMesh(!showAllMesh)
                                            }
                                            
                                          }}>Dread</button>

                    <button onClick={() => {
                                            
                                              setShowAllMesh(true)

                                            }
                                            
                                          }>Show All</button>
        </div>
    )

}

export default SideBar