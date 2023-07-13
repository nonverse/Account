import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import Form from "../../../elements/Form";
import {useEffect, useState} from "react";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {useDispatch, useSelector} from "react-redux";
import auth from "@/scripts/auth.js";
import Loader from "@/components/Loader.jsx";
import api from "@/scripts/api.js";
import {closeModal} from "@/state/app/modal.js";
import {sendNotification} from "@/state/app/notification.js";
import {updateUser} from "@/state/user.js";

const RecoveryEmail = () => {

    const user = useSelector(state => state.user.value)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState({
        form: false,
        modal: true
    })
    const dispatch = useDispatch()

    function validateEmail(value) {
        setError('')
        if (value === user.email) {
            setError('Recovery e-mail cannot be same as primary email(s)')
            return true
        }
        if (validate.email(value)) {
            setError(validate.email(value))
            return true
        }

    }

    useEffect(() => {
        async function initialise() {
            await auth.authorizationToken('update_recovery_email')
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
        <ScreenModal heading="Recovery E-Mail" subHeading="Add an e-mail for emergencies" loading={loading.modal}>
            {user.recovery ? (
                <Formik initialValues={{
                    email: user.recovery.email
                }} onSubmit={async (values) => {
                    setLoading({
                        ...loading,
                        form: true
                    })
                    await api.post('user/security/recovery/email', {
                        ...values,
                        owned: true
                    }, true)
                        .then(response => {
                            if (response.data.success) {
                                dispatch(updateUser({
                                    ...user,
                                    recovery: {
                                        ...user.recovery,
                                        email: values.email
                                    }
                                }))
                                dispatch(closeModal())
                                dispatch(sendNotification({
                                    message: 'Your recovery e-mail has been updated'
                                }))
                            }
                        })
                        .catch(e => {
                            switch (e.response.status) {
                                case 422:
                                    if (e.response.errors.email) {
                                        setError(e.response.errors.email)
                                    }
                                    break
                                default:
                                    setError('Something went wrong')
                                    break
                            }
                        })
                }}>
                    {({errors}) => (
                        <Form id="screen-modal-form" loading={loading.form}>
                            <Field name="email" label="Recovery E-Mail" validate={validateEmail} error={error}/>
                            <div id="screen-modal-text">
                                <p>
                                    Adding a recovery email helps you re-gain access to your account in the event that
                                    you lose access to your primary e-mail and phone
                                    <br/>
                                    <br/>
                                    You WILL NOT receive account notifications or promotions via this email
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="screen-modal-await-loader">
                    <Loader/>
                </div>
            )}
        </ScreenModal>
    )
}

export default RecoveryEmail
