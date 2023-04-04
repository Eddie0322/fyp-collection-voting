import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { MUTATION_VOTES } from "./Queries";
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

const EmotionSelection = ({id, setOpenModal}) => {
  const [selected, setSelected] = useState([]);
  const [insert_vote_poll, { data, loading, error }] = useMutation(MUTATION_VOTES);
  const { user } = UserAuth()
  
  //console.log({ data, loading, error })
  //console.log(selected);
  //console.log(options);


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
    if (selected.length !== 3 || data){
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
    if (data){
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

            setTimeout(() => {
              setOpenModal(false)
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

            <p className='vote-result'>Strongest Emotion: <em>{showSelected()[0]}</em></p>
            <p className='vote-result'>2nd Strongest Emotion: <em>{showSelected()[1]}</em></p>
            <p className='vote-result'>3rd Strongest Emotion: <em>{showSelected()[2]}</em></p>

            <div className='button-row'>
               <button 
                  className={buttonDisabled()[1]} 
                  style={{marginLeft: "160px"}} 
                  disabled={buttonDisabled()[0]}
                  onClick= {() => insertVotes()}>
                  <p>{submitButtonText()}</p>
                </button>
            </div>


            
    </div>
  );
};

export default EmotionSelection;