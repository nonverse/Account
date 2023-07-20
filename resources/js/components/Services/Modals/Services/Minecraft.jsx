import {Formik} from "formik";
import Form from "@/elements/Form.jsx";
import Field from "@/elements/Field.jsx";
import validate from "@/scripts/validate.js";

const Minecraft = ({back}) => {

    return (
        <>
            <Formik initialValues={{
                username: ''
            }} onSubmit={() => {

            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" cta="Continue">
                        <Field name="username" label="Minecraft username" validate={validate.require}
                               error={errors.username}/>
                        <div id="screen-modal-text">
                            <p>
                                You must have a valid and genuine Minecraft license in order to connect your profile to your account
                                <br/>
                                Nonverse Studios is not affiliated with Mojang or Microsoft in any way.
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>

        </>
    )
}

export default Minecraft
