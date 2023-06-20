import InLineButton from "@/elements/InLineButton.jsx";
import axios from "axios";
import {useDispatch} from "react-redux";
import {renderModal} from "@/state/app/modal.js";
import {useState} from "react";
import {motion} from "framer-motion";

const Logout = () => {

    const [confirm, setConfirm] = useState(false)
    const dispatch = useDispatch()

    return (
        <div id="logout">
            {confirm ? (
                <motion.div id="confirm-logout"
                            key="confirm-logout"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: .1}}
                >
                    <span>Are you sure you want to logout?</span>
                    <div id="confirm-logout-options">
                        <InLineButton onClick={async () => {
                            dispatch(renderModal({id: 'logout'}))
                            await axios.post('https://auth.nonverse.test/logout', {}, {
                                withCredentials: true
                            })
                                .then(async response => {
                                    if (response.data.data.success) {
                                        await axios.post('/logout')
                                            .then(response => {
                                                if (response.data.success) {
                                                    window.location.reload()
                                                }
                                            })
                                    }
                                })
                        }}>Yes</InLineButton>
                        <InLineButton onClick={() => {
                            setConfirm(false)
                        }}>No</InLineButton>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="logout"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: .1}}
                >
                    <InLineButton onClick={() => {
                        setConfirm(true)
                    }}>Logout</InLineButton>
                </motion.div>
            )}
        </div>
    )
}

export default Logout
