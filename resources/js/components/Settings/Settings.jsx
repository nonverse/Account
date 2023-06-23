import ContentContainer from "@/components/ContentContainer.jsx";
import Appearance from "@/components/Settings/Appearance.jsx";
import {useSelector} from "react-redux";

const Settings = () => {

    const settings = useSelector(state => state.application.settings.value)

    return (
        <ContentContainer heading="Settings" subHeading="Customise your Nonverse experience">
            <Appearance settings={settings}/>
        </ContentContainer>
    )
}

export default Settings
