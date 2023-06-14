import ScreenModal from "../../ScreenModal";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Form from "../../../elements/Form";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {Formik} from "formik";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";
import auth from "@/scripts/auth.js";

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
    })

    return (
        <ScreenModal heading="E-Mail" subHeading="What's your E-Mail" loading={loading.modal}>
            <Formik initialValues={{
                email: user.email
            }} onSubmit={(values) => {
                setLoading(true)
                dispatch(updateUser({
                    ...user,
                    ...values
                }))
                setTimeout(() => {
                    setLoading(false)
                    dispatch(closeModal())
                }, 500)
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
