import ContentContainer from "../ContentContainer";
import AboutYou from "./AboutYou";
import ContactInformation from "./ContactInformation";
import {useSelector} from "react-redux";

const PersonalInfo = () => {

    const user = useSelector(state => state.user.value)

    return (
        <ContentContainer heading="Personal Information"
                          subHeading="Information about you used across Nonverse applications" doesScroll>
            <AboutYou user={user}/>
            <ContactInformation user={user}/>
        </ContentContainer>
    )
}

export default PersonalInfo