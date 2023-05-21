import ContentContainer from "../ContentContainer";
import LoginAndRecovery from "./LoginAndRecovery";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {updateUser} from "../../state/user";

const Security = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateUser({
            ...user,
            recovery: {
                email: 'isuru2003@yahoo.com',
                phone: '+61-425158685'
            }
        }))
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])

    return (
        <ContentContainer heading="Security" subHeading="Security settings to protect you and your account" doesScroll
                          loading={loading}>
            <LoginAndRecovery user={user}/>
        </ContentContainer>
    )
}

export default Security 