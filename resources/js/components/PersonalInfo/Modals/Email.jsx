import ScreenModal from "../../ScreenModal";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Form from "../../../elements/Form";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {Formik} from "formik";
import {closeModal} from "../../../state/app/modal";
import auth from "@/scripts/auth.js";
import api from "@/scripts/api.js";
import {updateUser} from "@/state/user.js";
import {sendNotification} from "@/state/app/notification.js";

const Email = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState({
        form: false,
        modal: true
    })
    const dispatch = useDispatch()

    useEffect(() => {
        async function initialise() {
            await auth.authorizationToken('update_email')
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
        <ScreenModal heading="E-Mail" subHeading="What's your E-Mail" loading={loading.modal}>
            <Formik initialValues={{
                email: user.email
            }} onSubmit={async (values) => {
                setLoading({
                    ...loading,
                    form: true
                })
                await api.post('user/store/email', values, true)
                    .then(response => {
                        if (response.data.success) {
                            dispatch(updateUser({
                                ...user,
                                email: values.email,
                                email_verified_at: (user.email === values.email) ? user.email_verified_at : null
                            }))
                            dispatch(sendNotification({
                                message: 'Your e-mail has been updated',
                            }))
                            dispatch(closeModal())
                        }
                    })
                    .catch(e => {
                        //
                    })
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading.form}>
                        <Field name="email" label="E-Mail" validate={validate.email} error={errors.email}/>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Email
