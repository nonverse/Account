import ScreenModal from "@/components/ScreenModal.jsx";
import {useState} from "react";
import SelectService from "@/components/Services/Modals/SelectService.jsx";

const NewService = () => {

    const [state, setState] = useState(0)
    const [loading, setLoading] = useState(false)
    const views = {
        0: <SelectService/>
    }

    return (
        <ScreenModal id="new-service" heading="Services" subHeading="Connect a new service to your account" loading={loading}>
            {views[state]}
        </ScreenModal>
    )
}

export default NewService
