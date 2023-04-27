import React from 'react';
import './App.css';
import Scene from './three js/NewThree';
import Modal from './Modal';
import { calculatePCA } from './PCA';
import { useQuery, useSubscription } from '@apollo/client';
import { SUBSCRIPTION_COLLECTION_VALUE, SUBSCRIPTION_TOTAL_COUNT, COLLECTION_DATA } from './Queries';
import LoginModal from './loginModal';
import { UserAuth } from './AuthContext';
import ImagePreview from './ImagePreview';
import SideBar from './SideBar';
//import CollectionsMutation from './collection_mutation';

let initialData = new Array(1000).fill(0).map((d, id) => ({ id, PCAx: 0, PCAy: 0, PCAz: 0, Label: -1, totalVote: 0 }));
let listObjects;
let objectsImageUrl = [];

function App() {

  const [collections, setCollections] = React.useState();
  const [layout, setLayout] = React.useState('spiral');
  const [selectedPoint, setSelectedPoint] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openVote, setOpenVote] = React.useState(false);
  const [hoverPoint, setHoverPoint] = React.useState(null);
  const firstUpdate = React.useRef(true);
  //const data = React.useRef(initialData);
  const [data, setData] = React.useState(initialData);
  const [loading, setLoading] = React.useState(true);
  //const [collectionValue, setCollectionValue] = React.useState([])
  const collectionValue = React.useRef();
  const [stackedBarLabel, setStackedBarLabel] = React.useState()
  const [stackedBarValue, setStackedBarValue] = React.useState()
  const [stackedBarColors, setStackedBarColors] = React.useState()

  const { user, logOut, database_loading } = UserAuth()
  const [openLoginModal, setOpenLoginModal] = React.useState(false)
  const [zoom, setZoom] = React.useState(false)
  const [focus, setFocus] = React.useState({})

  const storeSelectedPoint = React.useRef(null)
  const [updatePosLoading, setUpdatePosLoading] = React.useState(false)
  const [isVoteByUser, setIsVoteByUser] = React.useState(false)

  const [optionToShow, setOptionToShow] = React.useState(undefined)
  const [showAllMesh, setShowAllMesh] = React.useState(true)


    const {loading: collection_data_loading, data: collection_data} = useQuery(COLLECTION_DATA)
      React.useEffect(() => {

        if(!collection_data_loading && collection_data){
          setCollections(collection_data.collection_poll)
          objectsImageUrl = collection_data.collection_poll.map(a => a.image_id)
        }

      },[collection_data_loading, collection_data])

    
    React.useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setLoading(false);

      listObjects = collections.map(
        (object, index) => {

          if(object.artist_title){
          return(
            <div key={index}>
              <h3 className='portal-header'>{object.title}</h3>
              <p className='portal-date'>{object.date_display}</p>
              <hr></hr>
              <p className='portal-content-title'>Place Of Origin<i className='portal-content-box'><i className='portal-content'>{object.place_of_origin}</i></i></p>
              <p className='portal-content-title'>Collection ID<i className='portal-content-box'><i className='portal-content'>{object.id}</i></i></p>
              <p className='portal-content-title'>Artist<i className='portal-content-box'><i className='portal-content'>{object.artist_title}</i></i></p>
              <p className='portal-content-title'>Category<i className='portal-content-box'><i className='portal-content'>{object.artwork_type_title}</i></i></p> 
              
                    
          </div>)

          }else{
            return(
              <div key={index}>
                <h3 className='portal-header'>{object.title}</h3>
                <p className='portal-date'>{object.date_display}</p>
                <hr></hr>
                <p className='portal-content-title'>Place Of Origin<i className='portal-content-box'><i className='portal-content'>{object.place_of_origin}</i></i></p>
              <p className='portal-content-title'>Collection ID<i className='portal-content-box'><i className='portal-content'>{object.id}</i></i></p>
              <p className='portal-content-title'>Artist<i className='portal-content-box'><i className='portal-content'>Artist Unknown</i></i></p>
              <p className='portal-content-title'>Category<i className='portal-content-box'><i className='portal-content'>{object.artwork_type_title}</i></i></p> 
                      
            </div>)
          }


        }
        
      )
      
    }, [collections]);


    //Get the Total Count 
    const { error: total_count_error, loading: total_count_loading, data:total_count_data } = useSubscription(SUBSCRIPTION_TOTAL_COUNT);

    //Get Collection Value from API
    const { error, loading: collection_value_loading, data:collection_value_data } = useSubscription(SUBSCRIPTION_COLLECTION_VALUE);
    let collectionValueArray = [];
    let votedCollections = [];
    
    React.useEffect(() => {
      if(collection_value_data && total_count_data){

            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].amusement)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].intimate)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].elegant)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].lively)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].spiritual)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].calmness)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].boredom)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].strange)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].mysterious)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].anxiety)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].sadness)
            }
            for(let i=0; i<1000; i++){
              collectionValueArray.push(collection_value_data.collection_value_accumulated_results[i].dread)
            }           

            for(let i = 0; i < 1000; i++){
              if(total_count_data.total_count[i].count > 0){
                votedCollections.push(total_count_data.total_count[i])
              }
            }


        collectionValue.current = collectionValueArray;
        var testArray = calculatePCA(collectionValue.current, collection_value_data.collection_value_accumulated_results, votedCollections);
          
        setTimeout(() => {
            setData(data.map((object, index) => (
              {
                ...object,
                PCAx: testArray.projection[index][0] + 5,
                PCAy: testArray.projection[index][1] + 5,
                PCAz: testArray.projection[index][2] + 5,
                Label: testArray.labelArray[index],
                totalVote: total_count_data.total_count[index].count
              }
            )))
            setUpdatePosLoading(false)
        },1000)

      }
    },[collection_value_data, total_count_data])
  

    //Get the largest three emotion value for displaying 
      let percentageLabelArray = [];
      let labelIndexArray = [];
      let percentageValueArray = [];
      let percentageColorsArray = [];
      let emoLabel = ["amusement", "intimate", "elegant", "lively", "spiritual", "calmness", "boredom", "strange", "mysterious", "anxiety", "sadness", "dread"]
      let colorsArray = ["#ff3", "#f88", "#88f", "#e72", "#4d2", "#3ff", "#663", "#999", "#c0f", "#40d", "#060", "#c24"]
      React.useEffect(() => {
          if(collection_value_data){
            for(let i=0; i<1000; i++){
              let percentageSingleArray = []
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].amusement)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].intimate)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].elegant)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].lively)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].spiritual)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].calmness)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].boredom)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].strange)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].mysterious)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].anxiety)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].sadness)
              percentageSingleArray.push(collection_value_data.collection_value_accumulated_results[i].dread)
              percentageSingleArray.push(0)

              labelIndexArray = findIndicesOfMax(percentageSingleArray, 12)
              percentageLabelArray.push(emoLabel[labelIndexArray[0]], emoLabel[labelIndexArray[1]], emoLabel[labelIndexArray[2]],)
              percentageValueArray.push(percentageSingleArray[labelIndexArray[0]], 
                                        percentageSingleArray[labelIndexArray[1]], 
                                        percentageSingleArray[labelIndexArray[2]],
                                        percentageSingleArray[labelIndexArray[3]]+
                                        percentageSingleArray[labelIndexArray[4]]+
                                        percentageSingleArray[labelIndexArray[5]]+
                                        percentageSingleArray[labelIndexArray[6]]+
                                        percentageSingleArray[labelIndexArray[7]]+
                                        percentageSingleArray[labelIndexArray[8]]+
                                        percentageSingleArray[labelIndexArray[9]]+
                                        percentageSingleArray[labelIndexArray[10]]+
                                        percentageSingleArray[labelIndexArray[11]])
              percentageColorsArray.push(colorsArray[labelIndexArray[0]], colorsArray[labelIndexArray[1]], colorsArray[labelIndexArray[2]])
              setStackedBarLabel(chunkArrayInGroups(percentageLabelArray, 3))
              setStackedBarValue(chunkArrayInGroups(percentageValueArray, 4))
              setStackedBarColors(chunkArrayInGroups(percentageColorsArray, 3))     
              
            }
          }

      },[collection_value_data])


      const handleSignOut = async() => {
        try{
          await logOut()
        }catch(error){
          console.log(error)
        }
      }

  
  return (
        
        <div className="App"> 
          <div className='Scene'>


              <div className='controls'>
                  <br></br>
                  <button onClick={() => {setLayout('spiral')}}>PCA</button>
                  <button onClick={() => {setLayout('grid'); setShowAllMesh(true)}}>Cube</button>
              </div>


              <div className='controlsUser'>

                  {/*Display the login info here first */}
                  <div>
                     
                            {user?(
                              <>
                              <br></br>
                              <div style={{fontSize: "14px", color: "rgba(255, 229, 180)", fontFamily: "Arial, Helvetica, sans-serif"}}>{user.displayName}</div>
                              <br></br>
                              <div style={{fontSize: "14px", color: "rgba(255, 229, 180)", fontFamily: "Arial, Helvetica, sans-serif"}}>{user.email}</div>
                              <br></br>
                                <>
                                {database_loading?(
                                    <></>
                                ):(
                                  <>
                                    <br></br>
                                    <button onClick={handleSignOut} className="btn"><p>LOGOUT</p></button>
                                    </>
                                )}
                                   
                                </>
                              </>
                            ):(
                              <>
                              {database_loading?(
                                <>
                                 <br></br>
                                 <div style={{fontSize: "14px", color: "rgba(255, 229, 180)", fontFamily: "Arial, Helvetica, sans-serif"}}>Loading...</div>
                                </>
                              ):(
                                <>
                                <br></br>
                                 <button onClick={() => setOpenLoginModal(true)} className="btn"><p>LOGIN</p></button>
                                 </>
                              )}
                             </>
                            )}
                          
                  </div>
              </div>

              <SideBar
                    optionToShow = {optionToShow}
                    setOptionToShow = {setOptionToShow}
                    showAllMesh = {showAllMesh}
                    setShowAllMesh = {setShowAllMesh}
              />
              
              <LoginModal
                    openLoginModal={openLoginModal}
                    closeLoginModal={() => setOpenLoginModal(false)}
              />
             

              <div className='threeBtnGroup'>
                <button onClick={() => setZoom(false)}>Zoom Out</button>
              </div>
             
              
              <ImagePreview 
                  hoverPoint={hoverPoint}
                  collections={collections}
                  objectsImageUrl={objectsImageUrl}
              />


              <Scene 
                  data = {data} 
                  layout = {layout} 
                  setLayout = {setLayout}
                  selectedPoint = {selectedPoint} 
                  onSelectPoint = {setSelectedPoint}
                  setOpenModal = {setOpenModal}
                  setOpenVote = {setOpenVote}
                  hoverPoint = {hoverPoint}
                  onHoverPoint = {setHoverPoint}
                  loading = {loading}
                  collection_data_loading = {collection_data_loading}
                  zoom = {zoom}
                  setZoom = {setZoom}
                  focus = {focus}
                  setFocus = {setFocus}
                  zoomToView = {(focusRef) => (setFocus(focusRef))}
                  storeSelectedPoint = {storeSelectedPoint}
                  updatePosLoading = {updatePosLoading}
                  setIsVoteByUser = {setIsVoteByUser}
                  isVoteByUser = {isVoteByUser}

                  optionToShow = {optionToShow}
                  showAllMesh = {showAllMesh}

                  />

          </div> 

          {selectedPoint && (
        
          <Modal 
                id = {selectedPoint.id}
                openModal = {openModal} 
                closeModal = {() => setOpenModal(false)} 
                image = {<img 
                  src = {"https://www.artic.edu/iiif/2/"+objectsImageUrl[selectedPoint.id]+"/full/843,/0/default.jpg"} 
                  loading = "lazy"
                  alt = ""
                />}
                info={
                  <h3>{listObjects[selectedPoint.id]}</h3>
                }
                infoTitle={
                  <h3 className='portal-header'>{collections[selectedPoint.id].title}</h3>
                }
                infoDate={
                  <p className='portal-date'>{collections[selectedPoint.id].date_display}</p>
                }
                voteCount={

                  <p className='portal-content-vote'>Total votes: {total_count_data.total_count[selectedPoint.id].count}</p>
                }
                checkVoteOpen = {openVote}
                openVote = {() => setOpenVote(true)}
                closeVote = {() => setOpenVote(false)}
                setOpenVote = {setOpenVote}
                setOpenModal = {setOpenModal}
                stackedBarLabel = {stackedBarLabel[selectedPoint.id]}
                stackedBarValue = {stackedBarValue[selectedPoint.id]}
                stackedBarColors = {stackedBarColors[selectedPoint.id]}
                setOpenLoginModal = {setOpenLoginModal}
                setZoom = {setZoom}
                storeSelectedPoint = {storeSelectedPoint}
                setUpdatePosLoading = {setUpdatePosLoading}
                setIsVoteByUser = {setIsVoteByUser}

                selectedPoint = {selectedPoint}
                setSelectedPoint = {setSelectedPoint}
                data = {data}
                zoomToView = {(focusRef) => (setFocus(focusRef))}
                layout = {layout}

          >
            
          </Modal>

          )}

          {/* <CollectionsMutation 
              newCollections={newCollections} 
              imageNullId = {imageNullId}/> */}
    </div>

  );
}

function findIndicesOfMax(inp, count) {
  var outp = [];
  for (var i = 0; i < inp.length; i++) {
      outp.push(i); // add index to output array
      if (outp.length > count) {
          outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
          outp.pop(); // remove the last index (index of smallest element in output array)
      }
  }
  return outp;
}

function chunkArrayInGroups(ar, num) {
  return ar.reduce(function(r, v, i) {
    if (i % num === 0) r.push(ar.slice(i, i + num));
    return r;
  }, []);
}


export default App;




    //////////////////////////////////////////////////////////////////////////////////

    // const [newCollections, setNewCollections] = React.useState();

    // React.useEffect(() => {
    //   const getData = async() => {
    //       let collectionData = await Promise.all([getCollectionData()]);
    //       //console.log("Collection Data from API: ")
    //       //console.log(collectionData)
    //       // collections.current = collectionData;
    //       setNewCollections(collectionData[0]);

    //       //Store all the image URL into an array
    //       //console.log("URL---------------------------------")
    //       objectsImageUrlNew = collectionData[0].map(a => a.image_id);
    //       //console.log(objectsImageUrl)
    //   };
    //   getData();
    // },[]);

    /////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////

    // let allCollections = [];
    // const getCollectionData = async() => {

    //     const response = await fetch(
    //       `https://api.artic.edu/api/v1/artworks/search?params=%7B%0D%0A%20%20%20%20%22query%22%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22bool%22%20%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22must%22%20%3A%20%5B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%22term%22%20%3A%20%7B%20%22is_public_domain%22%20%3A%20true%20%7D%20%7D%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%22term%22%20%3A%20%7B%20%22artwork_type_id%22%20%3A%20%221%22%20%7D%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%2C%0D%0A%20%20%20%20%22sort%22%3A%20%5B%0D%0A%20%20%20%20%7B%0D%0A%20%20%20%20%20%20%22id%22%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%22order%22%3A%20%22desc%22%0D%0A%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%20%20%5D%0D%0A%7D%0D%0A&fields=id,title,artist_title,date_display,artwork_type_title,image_id,place_of_origin&limit=44&page=15`
    //     );
    //     const data = await response.json();
    //     //console.log(data.data[0]);
    //     for(let j = 0; j < 44; j++){
    //       allCollections.push(data.data[j]);
    //     }
        
    //   //console.log(allCollections);
    //   return allCollections
    // }

    /////////////////////////////////////////////
