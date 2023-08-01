import {Formik} from "formik";
import Form from "@/elements/Form.jsx";
import Field from "@/elements/Field.jsx";
import validate from "@/scripts/validate.js";
import api from "@/scripts/api.js";
import {useState} from "react";

const MinecraftUsername = ({advance}) => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function validateUsername(value) {
        setError('')
        return validate.require(value)
    }

    return (
        <>
            <Formik initialValues={{
                username: ''
            }} onSubmit={async (values) => {
                setLoading(true)
                await api.post('user/services/minecraft/validate', values)
                    .then(response => {
                        advance()
                    })
                    .catch(e => {
                        switch (e.response.status) {
                            case 400:
                                setError('Profile not found')
                                break
                            default:
                                setError('Something went wrong')
                                break
                        }
                        setLoading(false)
                    })
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" cta="Continue" loading={loading}>
                        <Field name="username" label="Minecraft username" validate={validateUsername}
                               error={errors.username ? errors.username : error}/>
                        <div id="screen-modal-text">
                            <p>
                                You must have a valid and genuine Minecraft license in order to connect your profile to
                                your account
                                <br/>
                                Nonverse Studios is not affiliated with Mojang or Microsoft in any way.
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>

        </>
    )
}

export default MinecraftUsername
