import Sector from "../Sector";
import Item from "../../elements/Item";
import calendar from "../../scripts/helpers/calendar";
import {useDispatch} from "react-redux";
import {renderModal} from "../../state/app/modal";

const AboutYou = ({user}) => {

    const dispatch = useDispatch()

    return (
        <Sector heading="About You">
            <Item name="Name" value={`${user.name_first} ${user.name_last}`} action={() => {
                dispatch(renderModal({id: "update_name"}))
            }}/>
            <Item name="Username" value={user.username} action={() => {
                dispatch(renderModal({id: 'update_username'}))
            }}/>
            <Item name="Date of Birth" value={user.dob ? calendar.formatDate(user.dob, "-") : 'Not provided'} action={() => {
                dispatch(renderModal({id: 'update_dob'}))
            }}/>
            <Item name="Gender" value={user.gender ? user.gender : 'Not provided'} action={() => {
                dispatch(renderModal({id: 'update_gender'}))
            }}/>
        </Sector>
    )
}

export default AboutYou
