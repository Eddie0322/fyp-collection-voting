import React from "react";
import { useMutation, gql } from "@apollo/client";
import './App.css';


//GraphQL Mutation
const MUTATION_COLLECTIONS = gql`

    mutation update_collection_poll(
                $id: Int!
                $title: String!
                $image_id: String!
                $date_display: String!
                $artist_title: String!
                $place_of_origin: String!
                $artwork_type_title: String!



            ) {

             update_collection_poll(

                    _set: {
                      title: $title,
                      image_id: $image_id,
                      date_display: $date_display
                      artist_title: $artist_title
                      place_of_origin: $place_of_origin
                      artwork_type_title: $artwork_type_title

                  }
                  ,

                  where: {
                      id: {_eq: $id}, 
                  }

             )  
             
             {
              affected_rows
             }
                 
}
`

const CollectionsMutation = ({newCollections, imageNullId}) => {

    //console.log("!!!!!!!!!!!! ", collections);

    const [update_collection_poll, { data, loading, error }] = useMutation(MUTATION_COLLECTIONS);

    const updateDataInLoop = async (collections, imageNullId) => {
        for (let i = 0; i < 44; i++) {
          try { 
           await update_collection_poll({
             variables: {

                id: imageNullId[i],
                title: collections[i].title,

                image_id: collections[i].image_id,
                date_display: collections[i].date_display,
                artist_title: collections[i].artist_title,
                place_of_origin: collections[i].place_of_origin,
                artwork_type_title: collections[i].artwork_type_title

             },
           });
           continue;
          } catch ({ error })  {
            break;
          } 
        }
    };

    console.log({ data, loading, error });

    return <div className="aaa"><button onClick={() => updateDataInLoop(newCollections, imageNullId)}>Update</button></div>
}

export default CollectionsMutation;