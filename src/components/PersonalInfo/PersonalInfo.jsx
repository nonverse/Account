import ContentContainer from "../ContentContainer";
import AboutYou from "./AboutYou";
import ContactInformation from "./ContactInformation";

const PersonalInfo = () => {

    return (
        <ContentContainer heading="Personal Information"
                          subHeading="Information about you used across Nonverse applications" doesScroll>
            <AboutYou/>
            <ContactInformation/>
        </ContentContainer>
    )
}

export default PersonalInfo