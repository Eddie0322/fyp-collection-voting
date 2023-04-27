import React from 'react';
import './App.css';

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


        for(let i = 0; i < data.length; ++i ){

            if(data[i].totalVote === 0){

                arrUnvoted.push(i)

            } else {

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


        }, [data])



    
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

    }

    return(
        <>
            <button className='nextButton' onClick={() => Next()}>Next</button>
            <button className='prevButton' onClick={() => Prev()}>Prev</button>
        </>
    )

}

export default NextPrevButtons