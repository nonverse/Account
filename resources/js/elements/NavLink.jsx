import {NavLink as ReactNavLink} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {closeModal} from "../state/app/modal";
import {Link, usePage} from "@inertiajs/react";

const NavLink = ({to, children}) => {

    const {url} = usePage()
    const dispatch = useDispatch()

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
        <Link className="nav-link" href={to} onClick={() => {
            dispatch(closeModal())
        }}>
            <motion.span
                animate={(url === to) ? 'active' : 'inactive'}
                variants={variants}
            >
                {children}
            </motion.span>
        </Link>
    )
}

export default NavLink
