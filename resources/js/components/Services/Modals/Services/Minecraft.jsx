import {useState} from "react";
import MinecraftUsername from "@/components/Services/Modals/Services/MinecraftUsername.jsx";
import VerifyMinecraftProfile from "@/components/Services/Modals/Services/VerifyMinecraftProfile.jsx";

const Minecraft = () => {

    const [state, setState] = useState(0)
    const views = {
        0: <MinecraftUsername advance={advance}/>,
        1: <VerifyMinecraftProfile/>
    }

    function advance() {
        setState(state + 1)
    }

    return (
        <>
            {views[state]}
        </>
    )
}

export default Minecraft
