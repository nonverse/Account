import User from "@/components/User/User.jsx";
import Logout from "@/components/User/Logout.jsx";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader.jsx";
import {motion} from "framer-motion";
import {useSelector} from "react-redux";

const UserPopup = ({setShow}) => {

    const currentUser = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState({})

    useEffect(() => {
        async function initialise() {
            await axios.get("https://auth.nonverse.test/user/cookie", {
                withCredentials: true
            })
                .then(response => {
                    setUsers(response.data.data.users)
                    setLoading(false)
                })
        }

        initialise()
    }, [])

    return (
        <motion.div id="user-popup-overlay"
                    key={"user-popup-overlay"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: .1}}
                    exit={{opacity: 0}}
                    onClick={() => {
                        setShow(false)
                    }}>
            <div id="user-popup" onClick={(e) => {
                e.stopPropagation()
            }}>
                {loading ?
                    <Loader/> : (
                        <>
                            <div id="user-popup-title">
                                <h1>Users</h1>
                                <h2>Select your account</h2>
                            </div>
                            {Object.keys(users).map((uuid) => {
                                const user = users[uuid]
                                return (
                                    <User name={`${user.name_first} ${user.name_last}`} email={user.email} uuid={uuid} isCurrent={uuid === currentUser.uuid}/>
                                )
                            })}
                            <Logout setLoading={setLoading}/>
                        </>
                    )}
            </div>
        </motion.div>
    )
}

export default UserPopup
