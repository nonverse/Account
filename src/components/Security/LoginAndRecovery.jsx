import Sector from "../Sector";
import Item from "../../elements/Item";
import {useDispatch} from "react-redux";
import {renderModal} from "../../state/app/modal";

const LoginAndRecovery = ({user}) => {

    const dispatch = useDispatch()

    return (
        <Sector heading="Login & Security">
            <Item name="2 Step Login" value={user.use_totp ? 'Enabled' : 'Disabled'}
                  selector={user.use_totp ? 'Disable' : 'Enable'}
                  action={() => {
                      if (user.use_totp) {
                          // Disable 2-Step Login
                      } else {
                          dispatch(renderModal({id: 'toggle_two_step_login'}))
                      }
                  }}/>
            <Item name="Password" value="********" action={() => {
                console.log("Done")
            }}/>
            <Item name="Pin" value="****" action={() => {
                console.log("Done")
            }}/>
            <Item name="Recovery Email" value="isuru2003@yahoo.com" action={() => {
                console.log("Done")
            }}/>
            <Item name="Recovery Phone" value="0425 158 685" action={() => {
                console.log("Done")
            }}/>
        </Sector>
    )
}

export default LoginAndRecovery 