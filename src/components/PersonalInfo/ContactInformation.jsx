import Sector from "../Sector";
import Item from "../../elements/Item";
import {useDispatch} from "react-redux";
import {renderModal} from "../../state/app/modal";

const ContactInformation = ({user}) => {

    const dispatch = useDispatch()

    return (
        <Sector heading="Contact Information">
            <Item name="E-mail" value={user.email} action={() => {
                dispatch(renderModal({id: 'update_email'}))
            }}/>
            <Item name="Phone" value={user.phone} action={() => (console.log("Done"))}/>
        </Sector>
    )
}

export default ContactInformation