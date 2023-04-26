//import React from "react";
import { gql } from "@apollo/client";


export const SUBSCRIPTION_COLLECTION_VALUE = gql`
    subscription getCollectionValue {
         collection_value_accumulated_results {
                amusement
                anxiety
                boredom
                calmness
                collection_id
                dread
                elegant
                intimate
                lively
                mysterious
                sadness
                spiritual
                strange
        }
    }
`

export const INSERT_VOTES = gql`

        mutation insert_vote_poll(
            $collection_poll_id: Int!
            $created_by_user_id: String!
            $first_option_id: Int!
            $second_option_id: Int!
            $third_option_id: Int!
            ) {
            
        insert_vote(

                objects: {

                    collection_poll_id: $collection_poll_id, 
                    created_by_user_id: $created_by_user_id, 
                    first_option_id: $first_option_id, 
                    second_option_id: $second_option_id,
                    third_option_id: $third_option_id
                    
            }

        ){

            returning {

                id

            }
        }
    }
`

export const SUBSCRIPTION_TOTAL_COUNT = gql`
    subscription getTotalCount {
         total_count {
                id
                count
        }
    }
`

export const MUTATION_USERS = gql`
    mutation insert_user_poll(

            $id: String!
            $email: String!
            $created_at: String!

            ) {

                insert_user(
                    objects:{

                        id: $id,
                        email: $email,
                        created_at: $created_at,
                        last_seen_at: "now()",
                        online_ping: false


                    }
                ){
                    returning{

                        id,
                        email,
                        created_at,
                        last_seen_at,
                        online_ping

                    }
            }

    }
`

export const SUBSCRIPTION_USER_VOTE = gql`
    subscription get_user_vote ($id: String!) {
        user(where: {id: { _eq: $id } }) {
            votes {
              collection_poll_id
              first_option_id
              second_option_id
              third_option_id
            }
          }
    }
`

export const MUTATION_VOTES = gql`

    mutation mutate_user_vote(

            $created_by_user_id: String!, 
            $first_option_id: Int!, 
            $second_option_id: Int!, 
            $third_option_id: Int!, 
            $collection_poll_id: Int!
        
        ) {

        update_vote(

            _set: {
                first_option_id: $first_option_id,
                second_option_id: $second_option_id,
                third_option_id: $third_option_id
            }
            ,

            where: {
                created_by_user_id: {_eq: $created_by_user_id}, 
                collection_poll_id: {_eq: $collection_poll_id}
            }
            
        )

            {
                affected_rows
            }

        }
`


export const COLLECTION_DATA = gql`
        query get_collection_data {
            collection_poll(order_by: {id: asc}){
                id
                title
                image_id
                date_display
                artist_title
                place_of_origin
                artwork_type_title
            }
        }

`




