import Loader from "@/components/Loader.jsx";
import {useEffect} from "react";
import api from "@/scripts/api.js";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "@/state/user.js";

const VerifyEmail = () => {

    const user = useSelector(state => state.user.value)
    const query = new URLSearchParams(window.location.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function verify() {
            await api.post('auth/verify-email', {
                token: query.get('token')
            })
                .then((response) => {
                    if (response.data.success) {
                        dispatch(updateUser({
                            ...user,
                            email_verified_at: 'Just now'
                        }))
                        navigate('/')
                    }
                })
        }

        verify()
    }, [])

    return (
        <Loader/>
    )
}

export default VerifyEmail
