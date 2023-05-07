import { motion } from "framer-motion"
import logo from "./assets/Logo.png" 

const Logo = ({}) => {
    return(
        <motion.div className="logo-container">
                 <img class="webLogo" src={logo} alt="Logo"></img>
        </motion.div>
    )
}

export default Logo