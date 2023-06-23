import Sector from "@/components/Sector.jsx";
import Item from "@/elements/Item.jsx";
import {useDispatch} from "react-redux";
import {renderModal} from "@/state/app/modal.js";
import helpers from "@/scripts/helpers/helpers.js";

const Appearance = ({settings}) => {

    const dispatch = useDispatch()

    return (
        <Sector heading="Appearance">
            <Item name="Theme" value={(settings && settings.theme) ? helpers.capitaliseFirst(settings.theme) : 'System'} action={() => {
                dispatch(renderModal({id: 'update_theme'}))
            }}/>
            <Item name="Language" value="English (AU)" action={() => {

            }}/>
        </Sector>
    )
}

export default Appearance
