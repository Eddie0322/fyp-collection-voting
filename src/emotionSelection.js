import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { INSERT_VOTES, MUTATION_VOTES } from "./Queries";
import { useMutation } from "@apollo/client";
import { UserAuth } from './AuthContext';
import './App.css';

const options = [
  { label: "Amusement", value: "amusement", disabled: false, id: 1 },
  { label: "Intimate", value: "intimate", disabled: false, id: 2 },
  { label: "Elegant", value: "elegant", disabled: false, id: 3 },
  { label: "Lively", value: "lively", disabled: false, id: 4  },
  { label: "Spiritual", value: "spiritual", disabled: false, id: 5  },
  { label: "Calmness", value: "calmness", disabled: false, id: 6  },
  { label: "Boredom", value: "boredom", disabled: false, id: 7  },
  { label: "Strange", value: "strange", disabled: false, id: 8  },
  { label: "Mysterious", value: "mysterious", disabled: false, id: 9  },
  { label: "Anxiety", value: "anxiety", disabled: false, id: 10  },
  { label: "Sadness", value: "sadness", disabled: false, id: 11  },
  { label: "Dread", value: "dread", disabled: false, id: 12  },
];


const EmotionSelection = ({id, setOpenModal, setOpenLoginModal, setZoom, storeSelectedPoint, setUpdatePosLoading}) => {
  const [selected, setSelected] = useState([]);
  const [insert_vote_poll, { data: insert_vote_data, loading, error }] = useMutation(INSERT_VOTES);
  const [mutate_user_vote, { data: vote_affected_rows, loading: vote_loading, error: vote_error }] = useMutation(MUTATION_VOTES);
  const { user, userVotes, user_votes_data } = UserAuth()
  const [ voteSelection, setVoteSelection ] = useState([])
  
  //console.log({ data, loading, error })
  //console.log(selected);
  //console.log(options);
  //console.log(voteSelection)

  useEffect(() => {
      if(user && userVotes.includes(id)){
        var result = user_votes_data.user[0].votes.filter(obj => {
          return obj.collection_poll_id === id
        })     
        setVoteSelection([result[0].first_option_id, result[0].second_option_id, result[0].third_option_id])
      }else{
        setVoteSelection([])
      }
  },[user, userVotes])


  if (selected.length >= 3){
    for(let i = 0; i < 12; i++ ){
        options[i].collectionId = id
        options[i].disabled = true
    }
  }else{
    for(let i = 0; i < 12; i++ ){
        options[i].collectionId = id
        options[i].disabled = false
    }
  }


  function showSelected(){
    if (selected.length === 0){
      return (
        ["", "", ""]
      )
    } else if(selected.length === 1){
      return (
        [selected[0].label, "", ""]
      )
    } else if(selected.length === 2){
      return (
        [selected[0].label, selected[1].label, ""]
      )
    } else if(selected.length === 3){
      return (
        [selected[0].label, selected[1].label, selected[2].label]
      )
    }
  }

  function buttonDisabled(){
    if (selected.length !== 3 || insert_vote_data || vote_affected_rows){
      return(
        [true, "btn3"]
      )
    } else if (selected.length === 3) {
      return(
        [false, "btn2"]
      )
    }
  }

  function submitButtonText(){
    if (insert_vote_data){
      return "Voted"
    }else{
      return "Submit"
    }
  }
  
  
  const insertVotes = () => {
        if(user) {
            insert_vote_poll({
              variables: {
                collection_poll_id: selected[0].collectionId, 
                created_by_user_id: user.uid, 
                first_option_id: selected[0].id, 
                second_option_id: selected[1].id,
                third_option_id: selected[2].id
              },
            });

            storeSelectedPoint.current = selected[0].collectionId

            setTimeout(() => {
              setOpenModal(false)
              setZoom(false)
              setUpdatePosLoading(true)
            }, 1500)

        } else {
            console.log("Please Log In!")
        }
  }

  const modifyVotes = () => {
    if(user && (userVotes.includes(id))) {
      mutate_user_vote({
          variables: {
            collection_poll_id: selected[0].collectionId, 
            created_by_user_id: user.uid, 
            first_option_id: selected[0].id, 
            second_option_id: selected[1].id,
            third_option_id: selected[2].id
          },
        });

        storeSelectedPoint.current = selected[0].collectionId

        setTimeout(() => {
          setOpenModal(false)
          setZoom(false)
          setUpdatePosLoading(true)
        }, 1500)

    } else {
        console.log("Please Log In!")
    }
}

  return (
    <div>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                hasSelectAll={false}
                labelledBy="Select"
                disableSearch = {true}
                //disabled={isOptionDisabled()}
                shouldToggleOnHover={true}
                closeOnChangedValue={true}
                className="select-emotions"
            />

            {user && (userVotes.includes(id)) && (voteSelection.length !== 0)? (
              <>
              {(selected.length !== 0) ? (
                <>
                  <p className='vote-result'>Strongest Emotion: <em>{showSelected()[0]}</em></p>
                  <p className='vote-result'>2nd Strongest Emotion: <em>{showSelected()[1]}</em></p>
                  <p className='vote-result'>3rd Strongest Emotion: <em>{showSelected()[2]}</em></p>
                </>
              ):(
                <>
                  <p className='vote-result'>Previous Strongest Emotion Vote: <em>{options[voteSelection[0]-1].label}</em></p>
                  <p className='vote-result'>Previous 2nd Strongest Emotion Vote: <em>{options[voteSelection[1]-1].label}</em></p>
                  <p className='vote-result'>Previous 3rd Strongest Emotion Vote: <em>{options[voteSelection[2]-1].label}</em></p>
                </>
              )}
              </>
            ):(
              <>
                <p className='vote-result'>Strongest Emotion: <em>{showSelected()[0]}</em></p>
                <p className='vote-result'>2nd Strongest Emotion: <em>{showSelected()[1]}</em></p>
                <p className='vote-result'>3rd Strongest Emotion: <em>{showSelected()[2]}</em></p>
              </>
            )}

            <div className='button-row'>

              {user?(
                <>
                {userVotes.includes(id) ? (
                    <button 
                      className={buttonDisabled()[1]} 
                      style={{marginLeft: "160px"}} 
                      disabled={buttonDisabled()[0]}
                      onClick= {() => modifyVotes()}>
                      <p>Edit</p>
                    </button>
                ):(
                    <button 
                      className={buttonDisabled()[1]} 
                      style={{marginLeft: "160px"}} 
                      disabled={buttonDisabled()[0]}
                      onClick= {() => insertVotes()}>
                      <p>{submitButtonText()}</p>
                    </button>
                )} 
                </>  
              ):(
                <button 
                  className={ "btn2"} 
                  style={{marginLeft: "160px"}} 
                  onClick={() => setOpenLoginModal(true)}
                  >
                  <p>Login and Vote</p>
                </button>
              )}

            </div>


            
    </div>
  );
};

export default EmotionSelection;