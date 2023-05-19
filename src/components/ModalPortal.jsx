import {useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion";
import Name from "./PersonalInfo/Modals/Name";
import Username from "./PersonalInfo/Modals/Username";
import DateOfBirth from "./PersonalInfo/Modals/DateOfBirth";
import Gender from "./PersonalInfo/Modals/Gender";
import Email from "./PersonalInfo/Modals/Email";
import Phone from "./PersonalInfo/Modals/Phone";
import TwoStepLogin from "./Security/Modals/TwoStepLogin";

const ModalPortal = () => {

    const modal = useSelector(state => state.application.modal.value)

    /**
     * All modals used in the application should be registered here
     * and rendered by dispatching the 'renderModal' reducer;
     *
     * eg. dispatch(renderModal(id: modalKey, data: {optionalModalData}))
     *
     * @type {{modal_key: JSX.Element}}
     */
    const modalArray = {
        // Personal Info
        'update_name': <Name/>,
        'update_username': <Username/>,
        'update_dob': <DateOfBirth/>,
        'update_gender': <Gender/>,
        'update_email': <Email/>,
        'update_phone': <Phone/>,

        // Security
        'toggle_two_step_login': <TwoStepLogin/>
    }

    return (
        <div className="modal-portal">
            <AnimatePresence mode="wait">
                {modal ? modalArray[modal.id] : ''}
            </AnimatePresence>
        </div>
    )
}

export default ModalPortal 