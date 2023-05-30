import {Field, Formik} from "formik";
import Form from "../../../elements/Form";
import {useState} from "react";

const CreatePin = ({user, setPin, progress}) => {

    const [error, setError] = useState('')

    function changeFocus(e) {
        if (e.target.value.length >= e.target.getAttribute("maxlength")) {
            setError('')
            e.target.nextElementSibling.focus();
        }
    }

    return (
        <>
            <div id="pin-text">
                {user.use_pin ? (
                    ''
                ) : (
                    <p>
                        You can create a pin for your account which can be used to easily
                        authenticate & authorize yourself on devices that you use frequently
                    </p>
                )}
            </div>
            <Formik initialValues={{
                digit_1: '',
                digit_2: '',
                digit_3: '',
                digit_4: ''
            }} onSubmit={(values) => {
                if (Object.values(values).every(value => value !== '')) {
                    setPin(`${values.digit_1}${values.digit_2}${values.digit_3}${values.digit_4}`)
                    progress()
                } else {
                    setError('Please enter a full 4 digit pin')
                }
            }}>
                {() => (
                    <Form id="screen-modal-form">
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
        </>
    )
}

export default CreatePin