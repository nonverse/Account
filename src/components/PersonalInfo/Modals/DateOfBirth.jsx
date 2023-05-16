import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import calendar from "../../../scripts/helpers/calendar";
import Form from "../../../elements/Form";
import Field from "../../../elements/Field";
import {useState} from "react";
import Select from "../../../elements/Select";
import helpers from "../../../scripts/helpers/helpers";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";

const DateOfBirth = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="Date of Birth" subHeading="When were you born?">
            <Formik initialValues={{
                dob_month: calendar.months[user.dob.split('-')[1] - 1],
                dob_day: user.dob.split('-')[2],
                dob_year: user.dob.split('-')[0]
            }} onSubmit={(values) => {
                setLoading(true)
                let month = helpers.getObjectKey(calendar.months, values.dob_month)
                dispatch(
                    updateUser({
                        ...user,
                        dob: `${values.dob_year}-${++month}-${values.dob_day}`
                    }))

                setTimeout(() => {
                    setLoading(false)
                    dispatch(closeModal())
                }, 500)
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading}>
                        <div id="birthday-form">
                            <Select name="dob_month" label="Month">
                                {Object.values(calendar.months).map(month => (
                                    <option key={`dob-month-${month}`}>{month}</option>
                                ))}
                            </Select>
                            <Field name="dob_day" label="Day"></Field>
                            <Field name="dob_year" label="Year"></Field>
                        </div>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default DateOfBirth 