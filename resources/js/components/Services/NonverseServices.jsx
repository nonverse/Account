import Sector from "@/components/Sector.jsx";
import InLineButton from "@/elements/InLineButton.jsx";

const NonverseServices = () => {

    return (
        <Sector heading="Nonverse Services">
            <div id="no-services">
                <span className="default">Your account is not connected to any Nonverse services</span>
                <InLineButton id="connect-a-service">Connect a service</InLineButton>
            </div>
        </Sector>
    )
}

export default NonverseServices
