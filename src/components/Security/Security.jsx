import ContentContainer from "../ContentContainer";
import LoginAndRecovery from "./LoginAndRecovery";
import {useSelector} from "react-redux";

const Security = () => {

    const user = useSelector(state => state.user.value)

    return (
        <ContentContainer heading="Security" subHeading="Security settings to protect you and your account" doesScroll>
            <LoginAndRecovery user={user}/>
        </ContentContainer>
    )
}

export default Security 