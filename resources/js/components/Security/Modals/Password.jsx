import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import Form from "../../../elements/Form";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InLineButton from "../../../elements/InLineButton";
import {closeModal} from "../../../state/app/modal";
import auth from "@/scripts/auth.js";
import api from "@/scripts/api.js";
import {sendNotification} from "@/state/app/notification.js";

const Password = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState({
        form: false,
        modal: true
    })
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        async function initialise() {
            await auth.authorizationToken('update_password')
                .then(response => {
                    if (response.data.data.success) {
                        setLoading({
                            ...loading,
                            modal: false
                        })
                    }
                })
        }

        initialise()
    }, [])

    return (
        <ScreenModal heading="Password" subHeading="Create a password for your account" loading={loading.modal}>
            <Formik initialValues={{
                password: '',
                password_confirmation: ''
            }} onSubmit={async (values) => {
                setLoading({
                    ...loading,
                    form: true
                })
                await api.post('user/security/password', values, true)
                    .then(response => {
                        if (response.data.success) {
                            dispatch(sendNotification({
                                message: 'Your password has been updated',
                            }))
                            dispatch(closeModal())
                        }
                    })
            }}>
                {({values, errors}) => (
                    <Form id="screen-modal-form" loading={loading.form}>
                        <Field password={!showPassword} name="password" label="New password"
                               validate={value => validate.password(value, [user.name_first, user.name_last, user.username, user.email])}
                               error={errors.password}/>
                        <Field password={!showPassword} name="password_confirmation" label="Confirm new password"
                               validate={value => validate.confirmation(value, values.password)}
                               error={errors.password_confirmation}/>
                        <InLineButton id="show-password" onClick={() => {
                            setShowPassword(!showPassword)
                        }}>{`${showPassword ? 'Hide' : 'Show'} Password`}</InLineButton>
                        <div id="screen-modal-text">
                            <p>
                                Choose a strong password to secure your account.
                                <br/>
                                Your password MUST NOT contain any pieces of information that may be used to identify
                                you, such as your
                                name, username or e-mail.
                                <br/><br/>
                                Your password MUST be at least 8 characters long and contain a mix of alphanumeric and
                                special
                                characters
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Password
