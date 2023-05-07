import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { INSERT_VOTES, MUTATION_VOTES } from "./Queries";
import { useMutation } from "@apollo/client";
import { UserAuth } from './AuthContext';
import './App.css';

const DEFAULT_COLOR = ["#ff3", "#f88", "#88f", "#e72", "#4d2", "#3ff", "#663", "#999", "#c0f", "#40d", "#060", "#c24"]

const options = [
  { label: "Amusement", value: "amusement", disabled: false, id: 1, color: "#ff3" },
  { label: "Intimate", value: "intimate", disabled: false, id: 2, color: "##f88" },
  { label: "Elegant", value: "elegant", disabled: false, id: 3, color: "#88f" },
  { label: "Lively", value: "lively", disabled: false, id: 4, color: "#e72" },
  { label: "Spiritual", value: "spiritual", disabled: false, id: 5, color: "#4d2" },
  { label: "Calmness", value: "calmness", disabled: false, id: 6, color: "#3ff"  },
  { label: "Boredom", value: "boredom", disabled: false, id: 7, color: "#663"  },
  { label: "Strange", value: "strange", disabled: false, id: 8, color: "#999"  },
  { label: "Mysterious", value: "mysterious", disabled: false, id: 9, color: "#c0f"  },
  { label: "Anxiety", value: "anxiety", disabled: false, id: 10, color: "#40d"  },
  { label: "Sadness", value: "sadness", disabled: false, id: 11, color: "#060"  },
  { label: "Dread", value: "dread", disabled: false, id: 12, color: "#c24"  },
];


const EmotionSelection = ({
                            id, 
                            setOpenModal, 
                            setOpenLoginModal, 
                            setZoom, 
                            storeSelectedPoint, 
                            setUpdatePosLoading,
                            setIsVoteByUser,

                            layout,
                            setLayout,
                            setSelectUnvoted,
                            setCubeOptionToShow,
                            setSelectYourVotes,
                            setSelectHasVotes,
                            setSelectCubeUnvoted,
                            closeVote
                          }) => {
  const [selected, setSelected] = useState([]);
  const [insert_vote_poll, { data: insert_vote_data, loading, error }] = useMutation(INSERT_VOTES);
  const [mutate_user_vote, { data: vote_affected_rows, loading: vote_loading, error: vote_error }] = useMutation(MUTATION_VOTES);
  const { user, userVotes, user_votes_data } = UserAuth()
  const [ voteSelection, setVoteSelection ] = useState([])
  

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

  function showSelectedColor(){
    if (selected.length === 0){
      return (
        ["", "", ""]
      )
    } else if(selected.length === 1){
      return (
        [selected[0].color, "", ""]
      )
    } else if(selected.length === 2){
      return (
        [selected[0].color, selected[1].color, ""]
      )
    } else if(selected.length === 3){
      return (
        [selected[0].color, selected[1].color, selected[2].color]
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


            if(layout !== 'grid' && layout !== 'spiral'){
              setSelectYourVotes(false)
              setSelectHasVotes(false)
              setSelectCubeUnvoted(false)
              setCubeOptionToShow(null)
            }
          

            if(layout !== 'grid' && layout !== 'spiral'){
              setTimeout(() => {
                setOpenModal(false)
                setZoom(false) 
                setLayout('grid') 
              }, 1000)
             } else  {
              setTimeout(() => {
                        setOpenModal(false)
                        setZoom(false)    
                      }, 1000)

           }

           setUpdatePosLoading(true) 
           storeSelectedPoint.current = selected[0].collectionId
           setIsVoteByUser(true)
           setSelectUnvoted(false)

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

        if(layout !== 'grid' && layout !== 'spiral'){
          setSelectYourVotes(false)
          setSelectHasVotes(false)
          setSelectCubeUnvoted(false)
          setCubeOptionToShow(null)
        }

        if(layout !== 'grid' && layout !== 'spiral'){
            setTimeout(() => {
              setOpenModal(false)
              setZoom(false) 
              setLayout('grid') 
            }, 1000)
        } else  {
            setTimeout(() => {
                      setOpenModal(false)
                      setZoom(false)      
                    }, 1000)
        }

        setUpdatePosLoading(true)   
        storeSelectedPoint.current = selected[0].collectionId
        setIsVoteByUser(true)
        setSelectUnvoted(false)


    } else {
        console.log("Please Log In!")
    }
}

  return (
    <div className="multiselect">

            <div className="multiselect-info">
                Select Your Top Three Feelings On This Collection
            </div>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                hasSelectAll={false}
                labelledBy="Select"
                disableSearch = {true}
                //disabled={isOptionDisabled()}
                shouldToggleOnHover={false}
                closeOnChangedValue={true}
                className="select-emotions"
            />

            {user && (userVotes.includes(id)) && (voteSelection.length !== 0)? (
              <>
              {(selected.length !== 0) ? (
                <>
                  <p className='vote-result'>Strongest Emotion: <em style={{color: showSelectedColor()[0]}}>{showSelected()[0]}</em></p>
                  <p className='vote-result'>2nd Strongest Emotion: <em style={{color: showSelectedColor()[1]}}>{showSelected()[1]}</em></p>
                  <p className='vote-result'>3rd Strongest Emotion: <em style={{color: showSelectedColor()[2]}}>{showSelected()[2]}</em></p>
                </>
              ):(
                <>
                  <p className='vote-result'>Previous Strongest Emotion Vote: <em style={{color: options[voteSelection[0]-1].color }}>{options[voteSelection[0]-1].label}</em></p>
                  <p className='vote-result'>Previous 2nd Strongest Emotion Vote: <em style={{color: options[voteSelection[1]-1].color }}>{options[voteSelection[1]-1].label}</em></p>
                  <p className='vote-result'>Previous 3rd Strongest Emotion Vote: <em style={{color: options[voteSelection[2]-1].color }}>{options[voteSelection[2]-1].label}</em></p>
                </>
              )}
              </>
            ):(
              <>
                <p className='vote-result'>Strongest Emotion: <em style={{color: showSelectedColor()[0]}}>{showSelected()[0]}</em></p>
                <p className='vote-result'>2nd Strongest Emotion: <em style={{color: showSelectedColor()[1]}}>{showSelected()[1]}</em></p>
                <p className='vote-result'>3rd Strongest Emotion: <em style={{color: showSelectedColor()[2]}}>{showSelected()[2]}</em></p>
              </>
            )}

            <div className='button-row' style={{marginLeft: 0}}>

              <button onClick={closeVote} className="btn"><p>Back</p></button>

              {user?(
                <>
                {userVotes.includes(id) ? (
                    <button 
                      className={buttonDisabled()[1]} 
                      style={{marginLeft: "1vw"}} 
                      disabled={buttonDisabled()[0]}
                      onClick= {() => modifyVotes()}>
                      <p>Edit</p>
                    </button>
                ):(
                  
                    <button 
                      className={buttonDisabled()[1]} 
                      style={{marginLeft: "1vw"}} 
                      disabled={buttonDisabled()[0]}
                      onClick= {() => insertVotes()}>
                      <p>{submitButtonText()}</p>
                    </button>
                )} 
                </>  
              ):(
                
                <button 
                  className={ "btn2"} 
                  style={{marginLeft: "1vw"}} 
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