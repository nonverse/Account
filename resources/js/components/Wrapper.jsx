import Logo from "@/elements/Logo.jsx";
import Navigation from "./Navigation.jsx";
import ModalPortal from "./ModalPortal.jsx";
import {BrowserRouter} from "react-router-dom";

const Wrapper = ({children}) => {

    return (
        <div className="app">
            <Logo/>
            <BrowserRouter>
                <div className="container">
                    <Navigation/>
                    <div className="content-wrapper">
                        <ModalPortal/>
                        {children}
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Wrapper
