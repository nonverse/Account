import InLineButton from "@/elements/InLineButton.jsx";
import axios from "axios";

const Logout = () => {

    return (
        <InLineButton id="logout" onClick={async () => {
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
