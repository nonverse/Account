import {useSelector} from "react-redux";
import ContentContainer from "@/components/ContentContainer.jsx";
import VerifyEmail from "@/components/Home/Messages/VerifyEmail.jsx";
import {useState} from "react";
import UnderConstruction from "@/components/UnderConstruction.jsx";

const Home = () => {

    const user = useSelector(state => state.user.value)
    const [show, setShow] = useState({
        security: true
    })

    return (
        <ContentContainer heading={`Welcome, ${user.name_first}`} subHeading="Your account for all things Nonverse"
                          doesScroll>
            <div className="messages">
                {!user.email_verified_at ? <VerifyEmail/> : ''}
            </div>
            <UnderConstruction/>
        </ContentContainer>
    )
}

export default Home
