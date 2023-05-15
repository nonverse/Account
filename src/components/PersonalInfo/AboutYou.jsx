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
            <Item name="Username" value={user.username} action={() => (console.log("Done"))}/>
            <Item name="Date of Birth" value={calendar.formatDate(user.dob, "-")} action={() => (console.log("Done"))}/>
            <Item name="Gender" value={user.gender} action={() => (console.log("Done"))}/>
        </Sector>
    )
}

export default AboutYou