import ScreenModal from "@/components/ScreenModal.jsx";
import {useState} from "react";
import SelectService from "@/components/Services/Modals/SelectService.jsx";
import Minecraft from "@/components/Services/Modals/Services/Minecraft.jsx";

const NewService = () => {

    const [state, setState] = useState(0)
    const [loading, setLoading] = useState(false)
    const views = {
        0: <SelectService toService={toService}/>,
        1: <Minecraft back={back}/>
    }

    function toService(service) {
        setState(service)
    }

    function back() {
        setState(0)
    }

    return (
        <ScreenModal id="new-service" heading="Services" subHeading="Connect a new service to your account" loading={loading}>
            {views[state]}
        </ScreenModal>
    )
}

export default NewService
