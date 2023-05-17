import ScreenModal from "../../ScreenModal";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Form from "../../../elements/Form";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {Formik} from "formik";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";

const Email = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="E-Mail" subHeading="What's your E-Mail">
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
                    <Form id="screen-modal-form" loading={loading}>
                        <Field name="email" label="E-Mail" validate={validate.email} error={errors.email}/>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Email 