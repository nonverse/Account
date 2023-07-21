import Card from "@/elements/Card.jsx";
import minecraft from "../../../../assets/minecraft.svg"

const SelectService = ({toService}) => {

    return (
        <>
            <p id="new-service-text">
                Select the service that you wish to connect to your Nonverse account. All services listed below are built and/or trusted by Nonverse Studios (That's us)
            </p>
            <div id="services">
                <Card noDisplayName name="Minecraft" icon={minecraft} value="Nonverse official Minecraft server" onClick={() => {
                    toService(1)
                }}/>
            </div>
        </>
    )
}

export default SelectService
