import {motion} from "framer-motion";
import {Field, Formik} from "formik";
import Form from "../../../elements/Form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";

const ConfirmPin = ({user, pin, progress}) => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function changeFocus(e) {
        if (e.target.value.length >= e.target.getAttribute("maxlength")) {
            setError('')
            e.target.nextElementSibling.focus();
        }
    }

    return (
        <motion.div id="pin-confirm">
            <div id="pin-text">
                <p>
                    Please re-enter your pin to confirm it
                    <br/>
                    This helps you ensure that you have not entered any incorrect digits by mistake
                </p>
            </div>
            <Formik initialValues={{
                digit_1: '',
                digit_2: '',
                digit_3: '',
                digit_4: ''
            }} onSubmit={(values) => {
                const pin_confirmation = `${values.digit_1}${values.digit_2}${values.digit_3}${values.digit_4}`
                if (pin !== pin_confirmation) {
                    return setError('Pin confirmation does not match')
                }
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
                {() => (
                    <Form id="screen-modal-form" loading={loading}>
                        <div id="pin-form">
                            <Field type="password" className="pin-digit" name="digit_1" maxLength="1"
                                   onInput={(e) => changeFocus(e)}/>
                            <Field type="password" className="pin-digit" name="digit_2" maxLength="1"
                                   onInput={(e) => changeFocus(e)}/>
                            <Field type="password" className="pin-digit" name="digit_3" maxLength="1"
                                   onInput={(e) => changeFocus(e)}/>
                            <Field type="password" className="pin-digit" name="digit_4" maxLength="1"
                                   onInput={(e) => {
                                       e.target.blur()
                                       setError('')
                                   }}/>
                        </div>
                        <span id="pin-error">{error}</span>
                    </Form>
                )}
            </Formik>
        </motion.div>
    )
}

export default ConfirmPin 