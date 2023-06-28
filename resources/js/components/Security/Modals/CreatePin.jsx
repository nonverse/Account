import {Formik} from "formik";
import Form from "../../../elements/Form";
import DigitInput from "@/elements/DigitInput.jsx";
import validate from "@/scripts/validate.js";

const CreatePin = ({user, setPin, progress}) => {

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
                pin: ''
            }} onSubmit={(values) => {
                setPin({
                    pin: values.pin
                })
                progress()
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" cta="Continue">
                        <div id="pin-form">
                            <DigitInput password name="pin" validate={value => validate.require(value, 4, 4)}
                                        error={errors.pin ? 'Please enter a valid pin' : ''}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CreatePin
