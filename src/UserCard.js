import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './button.scss';


const UserCard = ({ user, database_loading, handleSignOut, setOpenLoginModal}) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
      };

    return(
        <div className='controlsUser'>

                  {/*Display the login info here first */}
                  <div>
                     
                            {user?(
                              <>
                              <div className="user-card">
                                    <img src={user.photoURL} alt="User profile" className="profile-pic" />
                                    <div className="user-info">
                                            <h2 className="user-name">{user.displayName}</h2>
                                    </div>

                                    <motion.button 
                                        className="dropdown-button" 
                                        onClick={() => {handleDropdownClick()}} 
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: showDropdown ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    />

                                        {showDropdown && (
                                            <motion.div 
                                                className="dropdown-list"
                                                initial={{ y: -25, opacity: 0 }}
                                                animate={{ y: showDropdown ? 10 : -25, opacity: 1 }}
                                            >
                                                
                                                {database_loading?(
                                                    
                                                        <div> Loading... </div>

                                                ):(
                                                    
                                                        <button onClick={() => {handleSignOut(); setShowDropdown(false)}} className={ "btn4"} ><p>LOGOUT</p></button>
                                                    
                                                )}
                                        
                                                 
                                            </motion.div>
                                         )}
                              </div>
                             
                              </>
                            ):(
                              <>
                              {database_loading?(
                                <>
                                    <div className="user-card" style={{padding: "24px"}}>
                                        <div className="user-dot"></div>
                                        <div className="user-info">
                                                <h2 className="user-name" style={{width: "60%"}}>Loading...</h2>
                                        </div>
                                    </div>
                                
                                </>
                              ):(
                                <>
                                
                                    <div className="user-card" style={{padding: "24px"}}>
                                            <div className="user-dot"></div>
                                            <div className="user-info" >
                                                
                                                    <motion.h2 
                                                        className="user-name" 
                                                        style={{
                                                                fontSize: "1rem",
                                                                width: "80%", 
                                                                cursor: "pointer", 
                                                                // textDecoration: "underline",
                                                                fontWeight: "300",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.8px",
                                                                color: "#eeeeee"
                                                            }}
                                                        onClick={() => {setOpenLoginModal(true)}}
                                                        whileHover={{
                                                            scale: 1.1,
                                                            transition: { duration: 0.3 }
                                                        }}
                                                    >
                                                        Sign In With Google &nbsp; &#10142;
                                                    </motion.h2>
                                            </div>
            
                                    </div>
                                 </>
                              )}
                             </>
                            )}
                          
                  </div>
              </div>
    )

}

export default UserCard