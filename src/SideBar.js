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
        </div>
    )

}

export default SideBar