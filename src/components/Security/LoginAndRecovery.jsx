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
                      dispatch(renderModal({id: 'toggle_two_step_login'}))
                  }}/>
            <Item name="Password" value="********" action={() => {
                dispatch(renderModal({id: 'update_password'}))
            }}/>
            <Item name="Pin" value={`${user.use_pin ? '****' : 'No Pin'}`} action={() => {
                dispatch(renderModal({id: 'update_pin'}))
            }}/>
            <Item name="Recovery Email" value={user.recovery.email} action={() => {
                dispatch(renderModal({id: 'update_recovery_email'}))
            }}/>
            <Item name="Recovery Phone" value={user.recovery.phone} action={() => {
                dispatch(renderModal({id: 'update_recovery_phone'}))
            }}/>
        </Sector>
    )
}

export default LoginAndRecovery 