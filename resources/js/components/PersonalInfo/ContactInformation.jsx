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
            {/*TODO Format Phone Number*/}
            <Item name="Phone" value={user.phone ? user.phone : 'Not provided'} action={() => {
                dispatch(renderModal({id: 'update_phone'}))
            }}/>
        </Sector>
    )
}

export default ContactInformation
