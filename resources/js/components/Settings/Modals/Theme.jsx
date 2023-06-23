import ScreenModal from "@/components/ScreenModal.jsx";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import helpers from "@/scripts/helpers/helpers.js";
import Form from "@/elements/Form.jsx";
import Select from "@/elements/Select.jsx";
import {useState} from "react";
import {updateSettings} from "@/state/app/settings.js";
import {closeModal} from "@/state/app/modal.js";
import cookies from "@/scripts/helpers/cookies.js";

const Theme = () => {

    const settings = useSelector(state => state.application.settings.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="Theme" subHeading="Choose the theme for your Nonverse applications">
            <Formik initialValues={{
                theme: (settings && settings.theme) ? helpers.capitaliseFirst(settings.theme) : 'System'
            }} onSubmit={(values) => {
                setLoading(true)

                setTimeout(() => {
                    dispatch(updateSettings({
                        ...settings,
                        theme: values.theme.toLowerCase()
                    }))
                    dispatch(closeModal())
                }, 500)
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading}>
                        <Select name="theme" label="Theme">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>System</option>
                        </Select>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Theme
