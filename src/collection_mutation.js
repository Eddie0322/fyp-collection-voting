import React from "react";
import { useMutation, gql } from "@apollo/client";


//GraphQL Mutation
const MUTATION_COLLECTIONS = gql`

    mutation insert_collection_poll(
                $collection_name: String!
                $id: Int!
            ) {

             insert_collection_poll(
                objects: {
                     collection_name: $collection_name, 
                     id: $id
                }    
             ) {

                returning {

                    collection_name,
                    id   

                }     
                
             }
                 
}
`

const CollectionsMutation = ({collections}) => {

    //console.log("!!!!!!!!!!!! ", collections);

    const [insert_collection_poll, { data, loading, error }] = useMutation(MUTATION_COLLECTIONS);

    const updateDataInLoop = async (collections) => {
        for (let i = 960; i < 1000; i++) {
          try { 
           await insert_collection_poll({
             variables: {
                collection_name: collections[i].title,
                id: i
             },
           });
           continue;
          } catch ({ error })  {
            break;
          } 
        }
    };

    console.log({ data, loading, error });

    return <div><button onClick={() => updateDataInLoop(collections)}></button></div>
}

export default CollectionsMutation;