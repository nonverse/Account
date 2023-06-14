import Logo from "../elements/Logo";
import Navigation from "./Navigation";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import Router from "./Router";
import {useEffect, useState} from "react";
import {Provider, useDispatch} from "react-redux";
import {updateUser} from "../state/user";
import Loader from "./Loader";
import ModalPortal from "./ModalPortal";
import store from "../state/store.js";
import api from "@/scripts/api.js";
import Logout from "@/elements/Logout.jsx";
import axios from "axios";
import {renderModal} from "@/state/app/modal.js";

function Index() {

    const [initialised, setInitialised] = useState(false)
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)

    useEffect(() => {
        api.initialise()
            .then(async response => {
                if (response.data.success) {
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
                    window.history.replaceState(null, document.title, window.location.pathname)
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
