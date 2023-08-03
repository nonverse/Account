import User from "@/components/User/User.jsx";
import Logout from "@/components/User/Logout.jsx";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader.jsx";

const UserPopup = ({setShow}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <div id="user-popup-overlay" onClick={() => {
            setShow(false)
        }}>
            <div id="user-popup" onClick={(e) => {
                e.stopPropagation()
            }}>
                {loading ?
                    <Loader/> : (
                        <>
                            <div id="user-popup-title">
                                <h1>Users</h1>
                                <h2>Select your account</h2>
                            </div>
                            <User name={"Isuru Abhayaratne"} email={"isuru2003a@gmail.com"} isCurrent/>
                            <User name={"Isuru Abhayaratne"} email={"isuru2003a@gmail.com"}/>
                            <Logout setLoading={setLoading}/>
                        </>
                    )}
            </div>
        </div>
    )
}

export default UserPopup
