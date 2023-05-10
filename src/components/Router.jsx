import {Route, Routes, useLocation} from "react-router";
import {AnimatePresence} from "framer-motion";
import UnderConstruction from "./UnderConstruction";

const Router = () => {

    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path={"*"} element={<UnderConstruction/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router