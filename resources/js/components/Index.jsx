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
import Api from "@/scripts/api.js";

function Index() {

    const [initialised, setInitialised] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        // Local test user
        dispatch(updateUser({
            email: 'isuru2003a@gmail.com',
            name_first: 'Isuru',
            name_last: 'Abhayaratne',
            username: 'Isuru_A',
            phone: '+61-451 188 191',
            dob: "2003-9-16",
            gender: "Male",
            admin: 0,
            use_totp: 0,
            use_pin: 0,
        }))

        Api.initialise()
            .then(response => {
                setInitialised(true)
                console.log(response.data)
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
