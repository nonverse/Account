import Logo from "./elements/Logo";
import Navigation from "./components/Navigation";
import {BrowserRouter} from "react-router-dom";
import Router from "./components/Router";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "./state/user";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
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
    }, [dispatch])

    return (
        <div className="app">
            <Logo/>
            <BrowserRouter>
                <div className="container">
                    <Navigation/>
                    <div className="content-wrapper">
                        <div className="modal-portal"/>
                        <Router/>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;