import ContentContainer from "../ContentContainer";
import LoginAndRecovery from "./LoginAndRecovery";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {updateUser} from "../../state/user";
import api from "@/scripts/api.js";

const Security = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        async function initialize() {
            await api.get('user/security/recovery')
                .then(response => {
                    dispatch(updateUser({
                        ...user,
                        recovery: response.data.data
                    }))
                    setLoading(false)
                })
        }

        initialize()
    }, [])

    return (
        <ContentContainer heading="Security" subHeading="Security settings to protect you and your account" doesScroll
                          loading={loading}>
            <LoginAndRecovery user={user}/>
        </ContentContainer>
    )
}

export default Security
