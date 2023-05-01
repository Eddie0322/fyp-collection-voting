import React from 'react';
import './App.css';
import { motion } from "framer-motion"
import { UserAuth } from './AuthContext';

const NextPrevButtons = ({
                setOpenModal,
                setZoom,
                storeSelectedPoint,
                selectedPoint,
                setSelectedPoint,
                data,
                zoomToView,
                setOpenVote,
                layout
            }) => {


    const [groupSelect, setGroupSelect] = React.useState()
    const [userUnvoted, setUserUnvoted] = React.useState()
    const [hasVote, setHasVote] = React.useState()
    const { user, userVotes } = UserAuth()

    React.useEffect(() => {

        let arrAmusement = [];
        let arrIntimate = [];
        let arrElegant = [];
        let arrLively = [];
        let arrSpiritual = [];
        let arrCalmness = [];
        let arrBoredom = [];
        let arrStrange = [];
        let arrMysterious = [];
        let arrAnxiety = [];
        let arrSadness = [];
        let arrDread = [];
        let arrUnvoted = [];
        let arrSelect = [];

        let arrUserUnvote = [];
        let arrHasVote = [];

        //Sort the userVotes array
        userVotes.sort((a, b) => a - b)


        for(let i = 0; i < data.length; ++i ){

            if(data[i].totalVote === 0){

                arrUnvoted.push(i)

            } else {

                 if (user)  {

                    if(!userVotes.includes(i)){

                        arrUserUnvote.push(i)

                    } 

                 }  else  {

                    arrHasVote.push(i)

                 }


                 if (data[i].Label === 0) {

                    arrAmusement.push(i)

                 } else if (data[i].Label === 1) {

                    arrIntimate.push(i)

                 } else if (data[i].Label === 2) {

                    arrElegant.push(i)

                 } else if (data[i].Label === 3) {

                   arrLively.push(i)

                 }  else if (data[i].Label === 4) {

                    arrSpiritual.push(i)
 
                 } else if (data[i].Label === 5) {

                    arrCalmness.push(i)
 
                 } else if (data[i].Label === 6) {

                    arrBoredom.push(i)
 
                 } else if (data[i].Label === 7) {

                    arrStrange.push(i)
 
                 } else if (data[i].Label === 8) {

                    arrMysterious.push(i)
 
                 } else if (data[i].Label === 9) {

                    arrAnxiety.push(i)
 
                 } else if (data[i].Label === 10) {

                    arrSadness.push(i)
 
                 } else if (data[i].Label === 11) {

                    arrDread.push(i)
 
                 } 
                }
             }

             arrSelect.push(
                        arrAmusement,
                        arrIntimate,
                        arrElegant,
                        arrLively,
                        arrSpiritual,
                        arrCalmness,
                        arrBoredom,
                        arrStrange,
                        arrMysterious,
                        arrAnxiety,
                        arrSadness,
                        arrDread,
                        arrUnvoted
                        )

        
            setGroupSelect(arrSelect)
            setUserUnvoted(arrUserUnvote)
            setHasVote(arrHasVote)


        }, [data, user, userVotes])



    
    const Next = () => {

        if(layout === 'spiral'){
            if(selectedPoint.totalVote === 0){

                let index = groupSelect[12].indexOf(selectedPoint.id)

                    if ( index === groupSelect[12].length -1 ){
                        storeSelectedPoint.current = groupSelect[12][0]
                        setSelectedPoint(data[groupSelect[12][0]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][0]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)

                    } else {
                        storeSelectedPoint.current = groupSelect[12][index+1]
                        setSelectedPoint(data[groupSelect[12][index+1]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][index+1]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)
                    }
            } else {

                let label = selectedPoint.Label
                let index = groupSelect[label].indexOf(selectedPoint.id)
                if ( index === groupSelect[label].length -1 ){
                    storeSelectedPoint.current = groupSelect[label][0]
                    setSelectedPoint(data[groupSelect[label][0]])
                    setZoom(true)
                    zoomToView(data[groupSelect[label][0]])
                    setOpenModal(false)
                    setTimeout(() => {
                        setOpenModal(true);
                        setOpenVote(false);
                     },400)
                } else {
                    storeSelectedPoint.current = groupSelect[label][index+1]
                    setSelectedPoint(data[groupSelect[label][index+1]])
                    setZoom(true)
                    zoomToView(data[groupSelect[label][index+1]])
                    setOpenModal(false)
                    setTimeout(() => {
                        setOpenModal(true);
                        setOpenVote(false);
                     }, 400)
                }

                
            }
        } 
        
        else {
            //If the current layout is cube//
            if(selectedPoint.totalVote === 0){
                //If the selected point has not yet been voted, switch among the unvoted array//
                let index = groupSelect[12].indexOf(selectedPoint.id)

                    if ( index === groupSelect[12].length -1 ){
                        storeSelectedPoint.current = groupSelect[12][0]
                        setSelectedPoint(data[groupSelect[12][0]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][0]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)

                    } else {
                        storeSelectedPoint.current = groupSelect[12][index+1]
                        setSelectedPoint(data[groupSelect[12][index+1]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][index+1]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)
                    }
            } else if (user) {
                //If the selected point has been voted and there is a user loggin//
                if (!userVotes.includes(selectedPoint.id)){
                    //If the selected point has not yet been voted by the user, switch among the userUnvoted array//
                        let index = userUnvoted.indexOf(selectedPoint.id)
                        if ( index === userUnvoted.length -1 ){
                            storeSelectedPoint.current = userUnvoted[0]
                            setSelectedPoint(data[userUnvoted[0]])
                            setZoom(true)
                            zoomToView(data[userUnvoted[0]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)

                        } else {
                            storeSelectedPoint.current = userUnvoted[index+1]
                            setSelectedPoint(data[userUnvoted[index+1]])
                            setZoom(true)
                            zoomToView(data[userUnvoted[index+1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)
                        }

                } else {
                     //If the selected point has been voted by the user, switch among the userVotes array//
                        let index = userVotes.indexOf(selectedPoint.id)
                        if ( index === userVotes.length -1 ){
                            storeSelectedPoint.current = userVotes[0]
                            setSelectedPoint(data[userVotes[0]])
                            setZoom(true)
                            zoomToView(data[userVotes[0]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)

                        } else {
                            storeSelectedPoint.current = userVotes[index+1]
                            setSelectedPoint(data[userVotes[index+1]])
                            setZoom(true)
                            zoomToView(data[userVotes[index+1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)
                        }

                }
                
            } else {
                //If the selected point has been voted and there is no user//
                let index = hasVote.indexOf(selectedPoint.id)
                        if ( index === hasVote.length -1 ){
                            storeSelectedPoint.current =  hasVote[0]
                            setSelectedPoint(data[hasVote[0]])
                            setZoom(true)
                            zoomToView(data[hasVote[0]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)

                        } else {
                            storeSelectedPoint.current = hasVote[index+1]
                            setSelectedPoint(data[hasVote[index+1]])
                            setZoom(true)
                            zoomToView(data[hasVote[index+1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)
                        }
            }

        }

    }


    const Prev = () => {

        if(layout === 'spiral'){
            if(selectedPoint.totalVote === 0){

                let index = groupSelect[12].indexOf(selectedPoint.id)

                    if ( index === 0 ){
                        storeSelectedPoint.current = groupSelect[12][groupSelect[12].length -1]
                        setSelectedPoint(data[groupSelect[12][groupSelect[12].length -1]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][groupSelect[12].length -1]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)

                    } else {
                        storeSelectedPoint.current = groupSelect[12][index-1]
                        setSelectedPoint(data[groupSelect[12][index-1]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][index-1]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)
                    }
            } else {

                let label = selectedPoint.Label
                let index = groupSelect[label].indexOf(selectedPoint.id)
                if ( index === 0 ){
                    storeSelectedPoint.current = groupSelect[label][groupSelect[label].length - 1]
                    setSelectedPoint(data[groupSelect[label][groupSelect[label].length - 1]])
                    setZoom(true)
                    zoomToView(data[groupSelect[label][groupSelect[label].length - 1]])
                    setOpenModal(false)
                    setTimeout(() => {
                        setOpenModal(true);
                        setOpenVote(false);
                     },400)
                } else {
                    storeSelectedPoint.current = groupSelect[label][index-1]
                    setSelectedPoint(data[groupSelect[label][index-1]])
                    setZoom(true)
                    zoomToView(data[groupSelect[label][index-1]])
                    setOpenModal(false)
                    setTimeout(() => {
                        setOpenModal(true);
                        setOpenVote(false);
                     }, 400)
                }

                
            }
        }

        else {
            //If the current layout is cube//
            if(selectedPoint.totalVote === 0){
                //If the selected point has not yet been voted, switch among the unvoted array//
                let index = groupSelect[12].indexOf(selectedPoint.id)

                    if ( index === 0 ){
                        storeSelectedPoint.current = groupSelect[12][groupSelect[12].length -1]
                        setSelectedPoint(data[groupSelect[12][groupSelect[12].length -1]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][groupSelect[12].length -1]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)

                    } else {
                        storeSelectedPoint.current = groupSelect[12][index-1]
                        setSelectedPoint(data[groupSelect[12][index-1]])
                        setZoom(true)
                        zoomToView(data[groupSelect[12][index-1]])
                        setOpenModal(false)
                        setTimeout(() => {
                            setOpenModal(true);
                            setOpenVote(false);
                         }, 400)
                    }

            } else if (user) {
                //If the selected point has been voted and there is a user loggin//
                if (!userVotes.includes(selectedPoint.id)){
                    //If the selected point has not yet been voted by the user, switch among the userUnvoted array//
                        let index = userUnvoted.indexOf(selectedPoint.id)
                        if ( index === 0 ){
                            storeSelectedPoint.current = userUnvoted[userUnvoted.length -1]
                            setSelectedPoint(data[userUnvoted[userUnvoted.length -1]])
                            setZoom(true)
                            zoomToView(data[userUnvoted[userUnvoted.length -1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)

                        } else {
                            storeSelectedPoint.current = userUnvoted[index-1]
                            setSelectedPoint(data[userUnvoted[index-1]])
                            setZoom(true)
                            zoomToView(data[userUnvoted[index-1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)
                        }

                } else {
                     //If the selected point has been voted by the user, switch among the userVotes array//
                        let index = userVotes.indexOf(selectedPoint.id)
                        if ( index === 0 ){
                            storeSelectedPoint.current = userVotes[userVotes.length -1]
                            setSelectedPoint(data[userVotes[userVotes.length -1]])
                            setZoom(true)
                            zoomToView(data[userVotes[userVotes.length -1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)

                        } else {
                            storeSelectedPoint.current = userVotes[index-1]
                            setSelectedPoint(data[userVotes[index-1]])
                            setZoom(true)
                            zoomToView(data[userVotes[index-1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)
                        }

                }
                
            } else {
                //If the selected point has been voted and there is no user//
                let index = hasVote.indexOf(selectedPoint.id)
                        if ( index === 0 ){
                            storeSelectedPoint.current =  hasVote[hasVote.length - 1]
                            setSelectedPoint(data[hasVote[hasVote.length - 1]])
                            setZoom(true)
                            zoomToView(data[hasVote[hasVote.length - 1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)

                        } else {
                            storeSelectedPoint.current = hasVote[index-1]
                            setSelectedPoint(data[hasVote[index-1]])
                            setZoom(true)
                            zoomToView(data[hasVote[index-1]])
                            setOpenModal(false)
                            setTimeout(() => {
                                setOpenModal(true);
                                setOpenVote(false);
                            }, 400)
                        }
            }

        }

    }

    let colorsArray = ["#ff3", "#f88", "#88f", "#e72", "#4d2", "#3ff", "#663", "#999", "#c0f", "#40d", "#060", "#c24"]
    let emoLabel = ["Amusement", "Intimate", "Elegant", "Lively", "Spiritual", "Calmness", "Boredom", "Strange", "Mysterious", "Anxiety", "Sadness", "Dread"]

    if (layout === 'spiral'){
        return(
            <>
                <div className='nextContainer'>
                    <motion.p 
                        className='nextPrevTag'
                    >
                        <span 
                            className="nextPrevTagDot" 
                            style={{backgroundColor: selectedPoint.totalVote === 0 ? "#bbb" : colorsArray[selectedPoint.Label]}}
                        ></span>
                        <>&ensp;</>
                        {selectedPoint.totalVote === 0 ? "Unvoted" : emoLabel[selectedPoint.Label]}
                    </motion.p>
                    <motion.button 
                        className='nextPrevButton' 
                        whileHover={{
                            fontSize: "18px", 
                            fontWeight: "900", 
                            color: selectedPoint.totalVote === 0 ? "#fff" : colorsArray[selectedPoint.Label] 
                        }}
                        onClick={() => Next()}
                        >
                            Next &#8594;
                    </motion.button>
                </div>
    
                <div className='prevContainer'>
                    <motion.p 
                        className='nextPrevTag'
                        style={{textAlign: "right"}}
                    >
                        <span 
                            className="nextPrevTagDot" 
                            style={{backgroundColor: selectedPoint.totalVote === 0 ? "#bbb" : colorsArray[selectedPoint.Label]}}
                        ></span>
                        <>&ensp;</>
                        {selectedPoint.totalVote === 0 ? "Unvoted" : emoLabel[selectedPoint.Label]}
                    </motion.p>
                    <motion.button 
                        className='nextPrevButton' 
                        whileHover={{
                            fontSize: "18px", 
                            fontWeight: "900", 
                            color: selectedPoint.totalVote === 0 ? "#fff" : colorsArray[selectedPoint.Label] 
                        }}
                        onClick={() => Prev()}>
                            &#8592; Prev
                    </motion.button>
                </div>
            </>
        )
    } else {
        return(
            <>
                <div className='nextContainer'>
                    <motion.p 
                        className='nextPrevTag'
                    >
                        <span 
                            className="nextPrevTagDot" 
                            style={{backgroundColor: user && userVotes.includes(selectedPoint.id) ? "#d53" : "#fff"}}
                        ></span>
                        <>&ensp;</>
                        {user && userVotes.includes(selectedPoint.id) ? "Your Votes" : selectedPoint.totalVote === 0 ? "Unvoted" : "Has Votes"}
                    </motion.p>
                    <motion.button 
                        className='nextPrevButton' 
                        whileHover={{
                            fontSize: "18px", 
                            fontWeight: "900", 
                            color: user && userVotes.includes(selectedPoint.id) ? "#d53" : "#fff"
                        }}
                        onClick={() => Next()}
                        >
                            Next &#8594;
                    </motion.button>
                </div>
    
                <div className='prevContainer'>
                    <motion.p 
                        className='nextPrevTag'
                        style={{textAlign: "right"}}
                    >
                        <span 
                            className="nextPrevTagDot" 
                            style={{backgroundColor: user && userVotes.includes(selectedPoint.id) ? "#d53" : "#fff"}}
                        ></span>
                        <>&ensp;</>
                        {user && userVotes.includes(selectedPoint.id) ? "Your Votes" : selectedPoint.totalVote === 0 ? "Unvoted" : "Has Votes"}
                    </motion.p>
                    <motion.button 
                        className='nextPrevButton' 
                        whileHover={{
                            fontSize: "18px", 
                            fontWeight: "900", 
                            color: user && userVotes.includes(selectedPoint.id) ? "#d53" : "#fff"
                        }}
                        onClick={() => Prev()}>
                            &#8592; Prev
                    </motion.button>
                </div>
            </>
        )

    }
    

}

export default NextPrevButtons