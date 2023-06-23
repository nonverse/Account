import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ScreenModal from "@/components/ScreenModal.jsx";
import auth from "@/scripts/auth.js";
import InputPhone from "@/components/PersonalInfo/Modals/InputPhone.jsx";
import VerifyPhone from "@/components/PersonalInfo/Modals/VerifyPhone.jsx";

const Phone = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState(0)
    const [phone, setPhone] = useState('')
    const views = {
        0: <InputPhone user={user} progress={progress} setPhone={setPhone}/>,
        1: <VerifyPhone user={user} phone={phone}/>
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
            await auth.authorizationToken('update_phone')
                .then(response => {
                    if (response.data.data.success) {
                        setLoading(false)
                    }
                })
        }

        initialise()
    })

    return (
        <ScreenModal heading="Phone" subHeading="What's your phone number?" loading={loading}>
            {views[state]}
        </ScreenModal>
    )
}

export default Phone
