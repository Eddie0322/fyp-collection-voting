import { SUBSCRIPTION_LAST_THREE_VOTES } from './Queries';
import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client';
import { motion, AnimatePresence } from 'framer-motion'
import './App.css';


const NotificationCards = ({
        lastThreeRecords, 
        updated,
        data,
        storeSelectedPoint,
        setSelectedPoint,
        setZoom,
        zoomToView,
        setOpenModal,
        setOpenVote
    }) => {

    function select(collection_id) {

            storeSelectedPoint.current = collection_id
            setSelectedPoint(data[collection_id])
            setZoom(true)
            zoomToView(data[collection_id])
            setOpenModal(false)
            setTimeout(() => {
                    setOpenModal(true);
                    setOpenVote(false);
                }, 600)
                
     }


    if(!updated){
        return(
        <>
                {lastThreeRecords.map((record, index) => (
                    <motion.div
                        key={index}
                        className='notification'

                        initial={{ 
                            opacity: index !== 2 ? 1 : 0, 
                            y: index === 0 ? -50 : index === 1 ? -30 : -10
                        }}
                        animate={{ 
                            opacity: index === 0 ? 1 : index === 1 ? 0.75 : 0.5, 
                            y: 0, 
                            transition: { duration: 0.5 } }}

                        exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}

                        whileHover={{scale: 1.05}}
                        onClick={() => {select(record.collection_poll_id)}}
                        
                    >
                        <span className='notification-dot'></span>
                        <span className='notification-text'>New Vote on Collection No. {record.collection_poll_id}</span>

                    </motion.div>
                ))}
            
        </>
    )
    }
    
}


const NotificationComponent = ({

        data,
        storeSelectedPoint,
        setSelectedPoint,
        setZoom,
        zoomToView,
        setOpenModal,
        setOpenVote

        }) => {


    const [ lastThreeRecords, setLastThreeRecords] = useState([]);
    const { loading, data: subData } = useSubscription(SUBSCRIPTION_LAST_THREE_VOTES );
    const [ updated, setUpdated ] = useState(false);


    useEffect(() => {
        if(subData && !loading){
              setLastThreeRecords(subData.vote);
              setUpdated(true)
        }
    }, [subData,loading])

    useEffect(() => {
        if (updated) {
            setUpdated(false)
          }
    }, [lastThreeRecords])


    return (
        <>
        {lastThreeRecords &&  (
             <div className='notification-container'>
                <div className="notification-container-title">updates</div>
                <AnimatePresence>
                    <NotificationCards 
                        lastThreeRecords={lastThreeRecords}
                        updated = {updated}
                        data = {data}
                        storeSelectedPoint = {storeSelectedPoint}
                        setSelectedPoint = {setSelectedPoint}
                        setZoom = {setZoom}
                        zoomToView = {zoomToView}
                        setOpenModal = {setOpenModal}
                        setOpenVote = {setOpenVote}
                    /> 
                </AnimatePresence>
                <div 
                    className='notificationInfo'
                    > 
                        - Collecting real-time votes from all users
                </div>
            </div>
        )
        }
        </>
    );
}

export default NotificationComponent