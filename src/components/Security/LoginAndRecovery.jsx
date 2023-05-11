import Sector from "../Sector";
import Item from "../../elements/Item";

const LoginAndRecovery = () => {

    return (
        <Sector heading="Login & Security">
            <Item name="2 Step Login" value="Disabled" selector="Enable" action={() => {console.log("Done")}}/>
            <Item name="Password" value="********" action={() => {console.log("Done")}}/>
            <Item name="Pin" value="****" action={() => {console.log("Done")}}/>
            <Item name="Recovery Email" value="isuru2003@yahoo.com" action={() => {console.log("Done")}}/>
            <Item name="Recovery Phone" value="0425 158 685" action={() => {console.log("Done")}}/>
        </Sector>
    )
}

export default LoginAndRecovery 