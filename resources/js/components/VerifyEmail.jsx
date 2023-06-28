import Loader from "@/components/Loader.jsx";
import {useEffect} from "react";
import api from "@/scripts/api.js";
import {useNavigate} from "react-router";

const VerifyEmail = () => {

    const query = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    useEffect(() => {
        async function verify() {
            await api.post('auth/verify-email', {
                expires: query.get('expires'),
                hash: query.get('hash'),
                id: query.get('id'),
                signature: query.get('signature')
            })
                .then((response) => {
                    if (response.data.success) {
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
