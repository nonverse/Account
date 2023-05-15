import {useSelector} from "react-redux";
import ScreenModal from "./ScreenModal";
import {AnimatePresence} from "framer-motion";

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
        'update_name': <ScreenModal heading={"Name"} subHeading={"What should we call you?"}/>
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