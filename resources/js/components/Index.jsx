import Logo from "../elements/Logo";
import Navigation from "./Navigation";
import {BrowserRouter, useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom';
import Router from "./Router";
import {useEffect, useState} from "react";
import {Provider, useDispatch} from "react-redux";
import {updateUser} from "../state/user";
import Loader from "./Loader";
import ModalPortal from "./ModalPortal";
import store from "../state/store.js";
import api from "@/scripts/api.js";
import InLineButton from "@/elements/InLineButton.jsx";
import Logout from "@/elements/Logout.jsx";

function Index() {

    const [initialised, setInitialised] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        api.initialise()
            .then(async response => {
                if (response.data.success) {
                    window.history.replaceState(null, document.title, window.location.pathname)
                    await api.get('user/store')
                        .then(response => {
                            dispatch(updateUser(response.data.data))
                        })
                    setInitialised(true)
                }
            })
            .catch(e => {
                switch (e.response.status) {
                    case 401:
                        window.location = e.response.data.data.auth_url
                        break
                    default:
                        break
                }
            })
    }, [dispatch])

    return (
        <div className="app">
            {initialised ?
                <>
                    <Logo/>
                    <BrowserRouter>
                        <div className="container">
                            <Navigation/>
                            <div className="content-wrapper">
                                <ModalPortal/>
                                <Router/>
                            </div>
                            <Logout/>
                        </div>
                    </BrowserRouter>
                </>
                : <Loader/>
            }
        </div>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <Index/>
        </Provider>
        , document.getElementById('root')
    );
}
