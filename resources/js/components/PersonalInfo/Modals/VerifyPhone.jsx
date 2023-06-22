import {Formik} from "formik";
import Form from "@/elements/Form.jsx";
import DigitInput from "@/elements/DigitInput.jsx";
import validate from "@/scripts/validate.js";

const VerifyPhone = ({phone}) => {

    return (
        <div id="phone-verify">
            <p id="phone-verify-text">
                Please enter the 6 digit code we just sent to {phone}
            </p>
            <Formik initialValues={{
                code: ''
            }} onSubmit={(values) => {
                console.log(values.code)
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" cta="Submit">
                        <DigitInput name="code" length={6} validate={value => validate.require(value, 6, 6)}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default VerifyPhone
