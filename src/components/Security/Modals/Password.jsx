import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import Form from "../../../elements/Form";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InLineButton from "../../../elements/InLineButton";

const Password = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="Password" subHeading="Create a password for your account">
            <Formik initialValues={{
                password: '',
                password_confirmation: ''
            }} onSubmit={(values) => {

            }}>
                {({values, errors}) => (
                    <Form id="screen-modal-form">
                        <Field password={!showPassword} name="password" label="New password"
                               validate={value => validate.require(value, 8)}
                               error={errors.password}/>
                        <Field password={!showPassword} name="password_confirmation" label="Confirm new password"
                               validate={value => validate.confirmation(value, values.password)}
                               error={errors.password_confirmation}/>
                        <InLineButton onClick={() => {setShowPassword(!showPassword)}}>Show</InLineButton>
                        <div id="screen-modal-text">
                            <p>
                                Choose a strong password to secure your account.
                                <br/>
                                Your password MUST NOT contain any pieces of information that may be used to identify
                                you, such as your
                                name, username or e-mail.
                                <br/><br/>
                                Your password MUST be at least 8 characters long and contain a mix of numeric,
                                alphanumeric and special
                                characters
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Password 