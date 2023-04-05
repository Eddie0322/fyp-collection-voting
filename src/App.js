import React from 'react';
import './App.css';
import Scene from './three js/NewThree';
import Modal from './Modal';
import { calculatePCA } from './PCA';

import { useSubscription } from '@apollo/client';
import { SUBSCRIPTION_COLLECTION_VALUE, SUBSCRIPTION_TOTAL_COUNT } from './Queries';


//Handle user loggin
import LoginModal from './loginModal';
import { UserAuth } from './AuthContext';

let initialData = new Array(1000).fill(0).map((d, id) => ({ id, PCAx: 0, PCAy: 0, PCAz: 0, Label: 0 }));
let listObjects;
let objectsImageUrl = [];

function App() {

  const [collections, setCollections] = React.useState();
  const [layout, setLayout] = React.useState('grid');
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
  const storeSelectedPoint = React.useRef(data[0])
  const [stackedBarLabel, setStackedBarLabel] = React.useState()
  const [stackedBarValue, setStackedBarValue] = React.useState()
  const [stackedBarColors, setStackedBarColors] = React.useState()

  const { user, logOut, database_loading } = UserAuth()
  const [openLoginModal, setOpenLoginModal] = React.useState(false)

  //const stackedBarLabel = React.useRef()

  //console.log("Modal open?  ", openModal);
  // console.log(storeSelectedPoint.current);
  // console.log(selectedPoint)
  //console.log("Loading? ", loading);
  //console.log("AppJS Data: ", data)
  //console.log(collections);
  //console.log(loginUser)


    React.useEffect(() => {
      const getData = async() => {
          let collectionData = await Promise.all([getCollectionData()]);
          //console.log("Collection Data from API: ")
          //console.log(collectionData)
          // collections.current = collectionData;
          setCollections(collectionData[0]);

          //Store all the image URL into an array
          //console.log("URL---------------------------------")
          objectsImageUrl = collectionData[0].map(a => a.image_id);
          //console.log(objectsImageUrl)
      };
      getData();
    },[]);
    
    React.useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setLoading(false);
      //console.log("After collection state updated: ")
      //console.log(collections);

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
    
    React.useEffect(() => {
      if(collection_value_data){

            if(selectedPoint){
              storeSelectedPoint.current = selectedPoint;
            }

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

        // setCollectionValue(collection_value_data.collection_value_accumulated_results);
        collectionValue.current = collectionValueArray;
        var testArray = calculatePCA(collectionValue.current, collection_value_data.collection_value_accumulated_results);
        //console.log(testArray)
          
        setTimeout(() => {
            setData(data.map((object, index) => (
              {
                ...object,
                PCAx: testArray.projection[index][0] + 5,
                PCAy: testArray.projection[index][1] + 5,
                PCAz: testArray.projection[index][2] + 5,
                Label: testArray.labelArray[index]
              }
            )))

        },1000)

      }
    },[collection_value_data])
  

    //Get the largest three emotion value for displaying 
      let percentageLabelArray = [];
      let labelIndexArray = [];
      let percentageValueArray = [];
      let percentageColorsArray = [];
      //let finalLabelArray = [];
      let emoLabel = ["amusement", "intimate", "elegant", "lively", "spiritual", "calmness", "boredom", "strange", "mysterious", "anxiety", "sadness", "dread"]
      let colorsArray = ["#ff3", "#05d", "#88f", "#e72", "#e33", "#c0f", "#3ff", "#0c0", "#663", "#777", "#933", "#ccc"]
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
              //stackedBarLabel.current = chunkArrayInGroups(percentageLabelArray, 3)      
              
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
                  <button onClick={() => setLayout('grid')}>Cube</button>
                  <button onClick={() => setLayout('spiral')}>PCA</button>
                  <br></br>
                  {selectedPoint && 
                  (
                  <div className="selected-point">
                        <div>You selected cube <strong>{selectedPoint.id}</strong></div>
                        <br></br>
                        {/* <div>{listObjects[selectedPoint.id]}</div> 
                        <div><h3 style={{color:'#4adede'}}><strong>Emotion Label {selectedPoint.Label}</strong></h3></div>  */}

                        <br></br>
                  </div>    
                  )}

                  {/*Display the login info here first */}
                  <div>
                     
                            {user?(
                              <>
                              <hr></hr>
                              <div style={{fontSize: "14px", color: "rgba(255, 229, 180)", fontFamily: "Arial, Helvetica, sans-serif"}}>{user.displayName}</div>
                              <br></br>
                              <div style={{fontSize: "14px", color: "rgba(255, 229, 180)", fontFamily: "Arial, Helvetica, sans-serif"}}>{user.email}</div>
                              <br></br>
                                <>
                                {database_loading?(
                                    <></>
                                ):(
                                    <button onClick={handleSignOut} className="btn"><p>LOGOUT</p></button>
                                )}
                                   
                                </>
                              </>
                            ):(
                              <>
                              {database_loading?(
                                 <div style={{fontSize: "14px", color: "rgba(255, 229, 180)", fontFamily: "Arial, Helvetica, sans-serif"}}>Loading...</div>
                              ):(
                                 <button onClick={() => setOpenLoginModal(true)} className="btn"><p>LOGIN</p></button>
                              )}
                             </>
                            )}
                          
                  </div>

              </div>

              
                <LoginModal
                    openLoginModal={openLoginModal}
                    closeLoginModal={() => setOpenLoginModal(false)}
                    >
                </LoginModal>
             


              <div className="hover-tag">
                    {hoverPoint && (
                      <div>
                        <strong>{collections[hoverPoint.id].title}</strong>
                      </div>
                    )}
                  </div>


              <Scene 
                  //data = {data.current} 
                  data = {data} 
                  layout={layout} 
                  selectedPoint={selectedPoint} 
                  onSelectPoint={setSelectedPoint}
                  setOpenModal = {setOpenModal}
                  setOpenVote = {setOpenVote}
                  hoverPoint={hoverPoint}
                  onHoverPoint={setHoverPoint}
                  loading={loading}
                  collection_value_loading={collection_value_loading}
                  storeSelected = {storeSelectedPoint.current}
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
                setOpenModal = {setOpenModal}
                stackedBarLabel = {stackedBarLabel[selectedPoint.id]}
                stackedBarValue = {stackedBarValue[selectedPoint.id]}
                stackedBarColors = {stackedBarColors[selectedPoint.id]}
                setOpenLoginModal = {setOpenLoginModal}

          >
            
          </Modal>
          )}
    </div>

  );
}


let allCollections = [];
const getCollectionData = async() => {

  for (let i = 1; i <= 10; i++) {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?params=%7B%0D%0A%20%20%20%20%22query%22%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22bool%22%20%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22must%22%20%3A%20%5B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%22term%22%20%3A%20%7B%20%22is_public_domain%22%20%3A%20true%20%7D%20%7D%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%22term%22%20%3A%20%7B%20%22artwork_type_id%22%20%3A%20%221%22%20%7D%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%2C%0D%0A%20%20%20%20%22sort%22%3A%20%5B%0D%0A%20%20%20%20%7B%0D%0A%20%20%20%20%20%20%22id%22%3A%20%7B%0D%0A%20%20%20%20%20%20%20%20%22order%22%3A%20%22asc%22%0D%0A%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%20%20%5D%0D%0A%7D%0D%0A&fields=id,title,artist_title,date_display,artwork_type_title,image_id,place_of_origin&limit=100&page=${i}`
    );
    const data = await response.json();
    //console.log(data.data[0]);
    for(let j = 0; j < 100; j++){
      allCollections.push(data.data[j]);
    }
    
  }
  //console.log(allCollections);
  return allCollections
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
