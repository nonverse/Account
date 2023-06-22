import {Formik} from "formik";
import Form from "../../../elements/Form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";
import DigitInput from "@/elements/DigitInput.jsx";
import validate from "@/scripts/validate.js";

const ConfirmPin = ({user, pin, progress}) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <div id="pin-text">
                <p>
                    Please re-enter your account pin to confirm it
                </p>
            </div>
            <Formik initialValues={{
                pin_confirmation: ''
            }} onSubmit={(values) => {
                setLoading(true)
                dispatch(updateUser({
                    ...user,
                    use_pin: 1
                }))
                setTimeout(() => {
                    setLoading(false)
                    dispatch(closeModal())
                }, 500)
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading}>
                        <div id="pin-form">
                            <DigitInput password name="pin_confirmation"
                                        validate={value => validate.confirmation(value, pin.pin)}
                                        error={errors.pin_confirmation}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ConfirmPin
