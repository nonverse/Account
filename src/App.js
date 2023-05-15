import Logo from "./elements/Logo";
import Navigation from "./components/Navigation";
import {BrowserRouter} from "react-router-dom";
import Router from "./components/Router";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "./state/user";
import Loader from "./components/Loader";
import ModalPortal from "./components/ModalPortal";

function App() {

    const [initialised, setInitialised] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        // Local test user
        dispatch(updateUser({
            email: 'isuru2003a@gmail.com',
            name_first: 'Isuru',
            name_last: 'Abhayaratne',
            username: 'Isuru_A',
            phone: '0451 188 191',
            dob: "16-9-2003",
            gender: "Male",
            recovery: {
                email: 'isuru2003@yahoo.com',
                phone: '0458 134 834'
            },
            admin: 0,
            use_totp: 0,
        }))

        //Temporary to imitate API fetch
        setTimeout(() => {
            setInitialised(true)
        }, 500)
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

export default App;