import {Formik} from "formik";
import Form from "@/elements/Form.jsx";
import DigitInput from "@/elements/DigitInput.jsx";
import validate from "@/scripts/validate.js";
import {useState} from "react";
import api from "@/scripts/api.js";
import {useDispatch} from "react-redux";
import {updateUser} from "@/state/user.js";
import {closeModal} from "@/state/app/modal.js";

const VerifyPhone = ({user, phone}) => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function validateCode(value) {
        setError('')
        return validate.require(value, 6, 6)
    }

    return (
        <div id="phone-verify">
            <p id="phone-verify-text">
                Please enter the 6 digit code we just sent to {phone}
            </p>
            <Formik initialValues={{
                code: ''
            }} onSubmit={async (values) => {
                setLoading(true)
                await api.post('user/store/phone', {
                    phone: phone,
                    code: values.code
                }, true)
                    .then(response => {
                        if (response.data.success) {
                            dispatch(updateUser({
                                ...user,
                                phone: phone,
                                phone_verified_at: 'Just now'
                            }))
                            dispatch(closeModal())
                        }
                    })
                    .catch(e => {
                        switch (e.response.status) {
                            case 401:
                                setError('Verification code is incorrect')
                                break
                            default:
                                setError('Something went wrong')
                                break
                        }
                    })
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" cta="Submit" loading={loading}>
                        <DigitInput name="code" length={6} validate={validateCode}
                                    error={errors.code ? errors.code : error}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default VerifyPhone
