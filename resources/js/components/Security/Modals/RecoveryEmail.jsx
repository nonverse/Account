import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import Form from "../../../elements/Form";
import {useState} from "react";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";

const RecoveryEmail = () => {

    const user = useSelector(state => state.user.value)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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

    return (
        <ScreenModal heading="Recovery E-Mail" subHeading="Add an e-mail for emergencies">
            <Formik initialValues={{
                email: user.recovery.email
            }} onSubmit={(values) => {
                setLoading(true)
                dispatch(updateUser({
                    ...user,
                    recovery: {
                        ...user.recovery,
                        email: values.email
                    }
                }))
                setTimeout(() => {
                    setLoading(false)
                    dispatch(closeModal())
                }, 500)
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading}>
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
        </ScreenModal>
    )
}

export default RecoveryEmail 