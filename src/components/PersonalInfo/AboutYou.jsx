import Sector from "../Sector";
import Item from "../../elements/Item";

const AboutYou = () => {

    return (
        <Sector heading="About You">
            <Item name="Name" value="Isuru Abhayaratne" action={() => (console.log("Done"))}/>
            <Item name="Username" value="Isuru_A" action={() => (console.log("Done"))}/>
            <Item name="Date of Birth" value="September 16, 2003" action={() => (console.log("Done"))}/>
            <Item name="Gender" value="Male" action={() => (console.log("Done"))}/>
        </Sector>
    )
}

export default AboutYou