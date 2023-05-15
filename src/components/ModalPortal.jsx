import {useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion";
import Name from "./PersonalInfo/Modals/Name";
import Username from "./PersonalInfo/Modals/Username";

const ModalPortal = () => {

    const modal = useSelector(state => state.application.modal.value)

    /**
     * All modals used in the application should be registered here
     * and rendered by dispatching the 'renderModal' reducer;
     *
     * eg. dispatch(renderModal(id: modalKey, data: {optionalModalData}))
     *
     * @type {{modalKey: JSX.Element}}
     */
    const modalArray = {
        'update_name': <Name/>,
        'update_username': <Username/>,
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