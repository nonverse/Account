import Sector from "../Sector";
import Item from "../../elements/Item";

const ContactInformation = ({user}) => {

    return (
        <Sector heading="Contact Information">
            <Item name="E-mail" value={user.email} action={() => (console.log("Done"))}/>
            <Item name="Phone" value={user.phone} action={() => (console.log("Done"))}/>
        </Sector>
    )
}

export default ContactInformation