import {Route, Routes, useLocation} from "react-router";
import {AnimatePresence} from "framer-motion";
import UnderConstruction from "./UnderConstruction";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Security from "./Security/Security";

const Router = () => {

    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path={"/personal-info"} element={<PersonalInfo/>}/>
                <Route path={"/security"} element={<Security/>}/>
                <Route path={"*"} element={<UnderConstruction/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router