import ContentContainer from "@/components/ContentContainer.jsx";
import NonverseServices from "@/components/Services/NonverseServices.jsx";
import ThirdParty from "@/components/Services/ThirdParty.jsx";

const Services = () => {

    return (
        <ContentContainer heading="Apps & Services" subHeading="Apps and services connected to your account">
            <NonverseServices/>
            <ThirdParty/>
        </ContentContainer>
    )
}

export default Services
