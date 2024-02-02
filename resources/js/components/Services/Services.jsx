import ContentContainer from "@/components/ContentContainer.jsx";
import NonverseServices from "@/components/Services/NonverseServices.jsx";
import ThirdParty from "@/components/Services/ThirdParty.jsx";
import {useEffect, useState} from "react";
import api from "../../scripts/api.js";

const Services = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        async function initialize() {
            await api.get('user/services')
                .then(response => {
                    setServices(response.data.data)
                })
        }

        initialize()
    }, [])

    return (
        <ContentContainer heading="Apps & Services" subHeading="Apps and services connected to your account">
            <NonverseServices services={services}/>
            <ThirdParty services={services}/>
        </ContentContainer>
    )
}

export default Services
