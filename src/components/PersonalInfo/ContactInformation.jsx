import Sector from "../Sector";
import Item from "../../elements/Item";

const ContactInformation = () => {

    return (
        <Sector heading="Contact Information">
            <Item name="E-mail" value="isuru2003a@gmail.com" action={() => (console.log("Done"))}/>
            <Item name="Phone" value="0453 283 183" action={() => (console.log("Done"))}/>
        </Sector>
    )
}

export default ContactInformation