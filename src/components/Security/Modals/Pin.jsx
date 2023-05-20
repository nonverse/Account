import ScreenModal from "../../ScreenModal";
import {useState} from "react";
import {useSelector} from "react-redux";
import CreatePin from "./CreatePin";
import ConfirmPin from "./ConfirmPin";

const Pin = () => {

    const user = useSelector(state => state.user.value)
    const [pin, setPin] = useState('')
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

    return (
        <ScreenModal id="pin" heading="Pin" subHeading="Create a pin to secure your account">
            {views[state]}
        </ScreenModal>
    )
}

export default Pin