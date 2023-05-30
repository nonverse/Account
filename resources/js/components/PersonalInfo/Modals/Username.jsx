import ScreenModal from "../../ScreenModal";
import Form from "../../../elements/Form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Field from "../../../elements/Field";
import {Formik} from "formik";
import validate from "../../../scripts/validate";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";

const Username = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="Username" subHeading="What should other Nonverse users call you?">
            <Formik initialValues={{
                username: user.username
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
                        <Field name="username" label="Username" validate={validate.require}
                               error={errors.username}/>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Username 