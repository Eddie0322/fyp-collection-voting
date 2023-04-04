import React , { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import './App.css';


let objectArray = [];
async function getData() {
    const endpoint = 'https://api.mplus.org.hk/graphql'
  
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer ab613a08e961f298be09f340df7e4055',     
      },
    })

    //  var newArray = [];
    //  for (var i = 0; i <= 1000; i++) {
    //     newArray.push(i);
    //  }
  
    const query = gql`
      {
        objects(page:0, per_page: 10, category: "Painting") {
          id
          displayDate
          title
          classification {
            area
            category
          }
          constituents{
            name
            nationality
          }
          color {
            search {
              google {
                color
                value
              }
            }
          }
        }
      }
    ` 
    const data = await graphQLClient.request(query)
    console.log("push the first time")
    objectArray.push.apply(objectArray, data.objects)

    return objectArray
  }


//let objectArray = [];
//console.log(objectArray);
let listObjects;

function Collections(){

  //let [collectionList, setCollectionList] = useState([])
  const initialState = [objectArray];
  const [collections, setCollections] = useState(initialState)

  useEffect(() => {
    getData()
    .then(() => setCollections(console.log(collections)))
    .then
    (function(){ listObjects = objectArray.map(
        (object, index) => {
          
          if(object.constituents){
          return(
            <div key={index}>
              <p style={{color:'Red'}}>{index}: {object.title}</p>
              <p>{object.id}</p>
              <p>{object.classification.category[0]}</p>
              <p>{object.displayDate}</p><br></br>
              {
                object.constituents.map((artist, subindex) =>{                   
                    return(
                        <div key={subindex}>
                            <p>{artist.name}</p>
                            <p>{artist.nationality}</p><br></br>
                        </div>
                    )
                
                })
              }           
          </div>)

          }else{
            return(
            <div key={index}>
              <p style={{color:'Red'}}>{index}: {object.title}</p>
              <p>{object.id}</p>
              <p>{object.classification.category[0]}</p>
              <p>{object.displayDate}</p><br></br>
              <p>Null</p>
              <p>Null</p><br></br>
           </div>)
          }

        }
        
      )
      
      console.log(listObjects); 
    })
  },[]);

    return (
      <div  id="thegrid">
        {listObjects}
      </div>
      
    )
}

export default Collections
export {objectArray}