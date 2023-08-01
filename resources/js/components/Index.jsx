import Logo from "../elements/Logo";
import Navigation from "./Navigation";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import Router from "./Router";
import {useEffect, useState} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {updateUser} from "../state/user";
import Loader from "./Loader";
import ModalPortal from "./ModalPortal";
import store from "../state/store.js";
import api from "@/scripts/api.js";
import axios from "axios";
import {renderModal} from "@/state/app/modal.js";
import cookies from "@/scripts/helpers/cookies.js";
import {updateSettings} from "@/state/app/settings.js";
import NotificationPortal from "@/components/NotificationPortal.jsx";
import UserIcon from "@/components/User/UserIcon.jsx";

function Index() {

    const [initialised, setInitialised] = useState(false)
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const settings = useSelector(state => state.application.settings.value)
    const settingsCookie = cookies.get('settings')

    useEffect(() => {
        api.initialise()
            .then(async response => {
                if (response.data.success) {
                    await api.get('user/settings')
                        .then(response => {
                            dispatch(updateSettings(response.data.data))
                        })
                    await api.get('user/store')
                        .then(response => {
                            dispatch(updateUser(response.data.data))
                        })
                    if (query.get('authorization_token')) {
                        await axios.post('/api/authorization-token', query)
                    }
                    if (query.get('state')) {
                        const state = JSON.parse(query.get('state'))
                        dispatch(renderModal(state.modal.value))
                    }
                    if (window.location.pathname !== '/verify') {
                        window.history.replaceState(null, document.title, window.location.pathname)
                    }
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
        <div
            className={`app ${(settings && settings.theme) ? settings.theme : `${settingsCookie ? JSON.parse(settingsCookie).theme : 'system'}`}`}>
            {initialised ?
                <>
                    <Logo/>
                    <BrowserRouter>
                        <div className="container">
                            <UserIcon/>
                            <Navigation/>
                            <div className="content-wrapper">
                                <ModalPortal/>
                                <NotificationPortal/>
                                <Router/>
                            </div>
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
