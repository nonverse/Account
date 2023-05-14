import Sector from "../Sector";
import Item from "../../elements/Item";
import calendar from "../../scripts/helpers/calendar";

const AboutYou = ({user}) => {

    return (
        <Sector heading="About You">
            <Item name="Name" value={`${user.name_first} ${user.name_last}`} action={() => (console.log("Done"))}/>
            <Item name="Username" value={user.username} action={() => (console.log("Done"))}/>
            <Item name="Date of Birth" value={calendar.formatDate(user.dob, "-")} action={() => (console.log("Done"))}/>
            <Item name="Gender" value={user.gender} action={() => (console.log("Done"))}/>
        </Sector>
    )
}

export default AboutYou