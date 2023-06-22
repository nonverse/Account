import ScreenModal from "../../ScreenModal";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CreatePin from "./CreatePin";
import ConfirmPin from "./ConfirmPin";
import auth from "@/scripts/auth.js";

const Pin = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)
    const [pin, setPin] = useState({})
    const [state, setState] = useState(0)
    const views = {
        0: <CreatePin user={user} setPin={setPin} progress={progress}/>,
        1: <ConfirmPin user={user} pin={pin} progress={progress}/>
    }

    function progress(back) {
        if (back) {
            setState(state - 1)
        } else {
            setState(state + 1)
        }
    }

    useEffect(() => {
        async function initialise() {
            await auth.authorizationToken('update_pin')
                .then(response => {
                    if (response.data.data.success) {
                        setLoading(false)
                    }
                })
        }

        initialise()
    })

    return (
        <ScreenModal id="pin" heading="Pin" subHeading="Create a pin to secure your account" loading={loading}>
            {views[state]}
        </ScreenModal>
    )
}

export default Pin
