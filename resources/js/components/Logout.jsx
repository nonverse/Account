import InLineButton from "@/elements/InLineButton.jsx";
import axios from "axios";
import {useDispatch} from "react-redux";
import {renderModal} from "@/state/app/modal.js";

const Logout = () => {

    const dispatch = useDispatch()

    return (
        <InLineButton id="logout" onClick={async () => {
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
        }}>Logout</InLineButton>
    )
}

export default Logout
