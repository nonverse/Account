import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import Field from "../../../elements/Field";
import Form from "../../../elements/Form";
import validate from "../../../scripts/validate";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";
import {useState} from "react";
import api from "@/scripts/api.js";
import {sendNotification} from "@/state/app/notification.js";

const Name = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="Name" subHeading="What should we call you?">
            <Formik initialValues={{
                name_first: user.name_first,
                name_last: user.name_last
            }} onSubmit={async (values) => {
                setLoading(true)
                await api.post('user/store', values)
                    .then(response => {
                        dispatch(updateUser({
                            ...user,
                            ...values
                        }))
                        //setLoading(false)
                        dispatch(sendNotification({
                            message: 'Your name has been updated',
                        }))
                        dispatch(closeModal())
                    })
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading}>
                        <Field name="name_first" label="First Name" validate={validate.require}
                               error={errors.name_first}/>
                        <Field name="name_last" label="Last Name" validate={validate.require} error={errors.name_last}/>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Name
