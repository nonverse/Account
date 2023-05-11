import {NavLink as ReactNavLink} from "react-router-dom";
import {motion} from "framer-motion";

const NavLink = ({to, children}) => {

    const variants = {
        active: {
            backgroundColor: "#6951FF",
            opacity: ".4",
            paddingLeft: "1.5rem",
            marginLeft: "2rem",
            color: "#ECF0F3",
        },
        inactive: {
            backgroundColor: "transparent",
            paddingLeft: 0,
            marginLeft: 0,
            opacity: 1,
            color: "#333344",
        }
    }

    return (
        <ReactNavLink className="nav-link" to={to}>
            {({isActive}) => (
                <motion.span
                    animate={isActive ? 'active' : 'inactive'}
                    variants={variants}
                >
                    {children}
                </motion.span>
            )}
        </ReactNavLink>
    )
}

export default NavLink