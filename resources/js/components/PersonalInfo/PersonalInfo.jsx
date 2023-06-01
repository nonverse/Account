import ContentContainer from "../ContentContainer";
import AboutYou from "./AboutYou";
import ContactInformation from "./ContactInformation";
import Wrapper from "../Wrapper.jsx";

const PersonalInfo = ({user}) => {

    return (
        <Wrapper>
            <ContentContainer heading="Personal Information"
                              subHeading="Information about you used across Nonverse applications" doesScroll>
                <AboutYou user={user}/>
                <ContactInformation user={user}/>
            </ContentContainer>
        </Wrapper>
    )
}

export default PersonalInfo
