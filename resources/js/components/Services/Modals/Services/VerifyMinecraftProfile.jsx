import {Formik} from "formik";
import Form from "@/elements/Form.jsx";
import {useState} from "react";
import DigitInput from "@/elements/DigitInput.jsx";
import validate from "@/scripts/validate.js";
import InLineButton from "@/elements/InLineButton.jsx";

const VerifyMinecraftProfile = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function validateCode(value) {
        setError('')
        return validate.require(value)
    }

    return (
        <>
            <Formik initialValues={{
                code: ''
            }} onSubmit={(values) => {

            }}>
                {({errors}) => (
                    <div id="connect-minecraft">
                        <p id="connect-minecraft-text-top">
                            Now we need to verify your Minecraft profile.
                            <br/>
                            We will do this by sending a 6 digit code to
                            the chat of your game whilst you are logged into an official Nonverse Minecraft server
                            <br/>
                            <br/>
                            <span className="splash">Server address: </span>mc.nonverse.net
                            <br/>
                            <span className="splash">Port: </span>25565 (Default)
                            <br/>
                            <br/>
                            Once you are logged in, click <InLineButton>here</InLineButton> to receive a 6 digit code and enter it below
                        </p>
                        <Form id="screen-modal-form" cta="Continue" loading={loading}>
                            <DigitInput length={6} validate={validateCode} error={errors.code ? errors.code : error}
                                        name="code"/>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default VerifyMinecraftProfile
