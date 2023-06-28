import {Route, Routes, useLocation} from "react-router";
import {AnimatePresence} from "framer-motion";
import UnderConstruction from "./UnderConstruction";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Security from "./Security/Security";
import Settings from "@/components/Settings/Settings.jsx";
import VerifyEmail from "@/components/VerifyEmail.jsx";

const Router = () => {

    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                // Views
                <Route path={"/personal-info"} element={<PersonalInfo/>}/>
                <Route path={"/security"} element={<Security/>}/>
                <Route path={"/settings"} element={<Settings/>}/>

                // Utilities
                <Route path={'/verify'} element={<VerifyEmail/>}/>
                <Route path={"*"} element={<UnderConstruction/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router
