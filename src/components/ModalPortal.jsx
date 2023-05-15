import {useSelector} from "react-redux";
import ScreenModal from "./ScreenModal";

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
            {modal ? modalArray[modal.id] : ''}
        </div>
    )
}

export default ModalPortal 