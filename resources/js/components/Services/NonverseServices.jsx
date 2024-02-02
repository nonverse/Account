import Sector from "@/components/Sector.jsx";
import InLineButton from "@/elements/InLineButton.jsx";
import {useDispatch} from "react-redux";
import {renderModal} from "@/state/app/modal.js";

const NonverseServices = ({services}) => {

    const dispatch = useDispatch()

    return (
        <Sector heading="Nonverse Services">
            <div id="no-services">
                <span className="default">Your account is not connected to any Nonverse services</span>
                <InLineButton id="connect-a-service" onClick={() => {
                    dispatch(renderModal({id: 'new_service'}))
                }}>Connect a service</InLineButton>
            </div>
        </Sector>
    )
}

export default NonverseServices
