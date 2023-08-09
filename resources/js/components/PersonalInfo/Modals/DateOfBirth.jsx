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
import api from "@/scripts/api.js";
import {sendNotification} from "@/state/app/notification.js";

const DateOfBirth = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function validateDay(value, month, year) {

        let key = helpers.getObjectKey(calendar.months, month)
        const thirtyOne = [1, 3, 5, 7, 8, 10, 12]

        if (++key === 2) {
            if (year % 4 === 0) {
                if (value < 1 || value > 29) {
                    return true
                }
            } else {
                if (value < 1 || value > 28) {
                    return true
                }
            }
        } else if (thirtyOne.includes(++key)) {
            if (value < 1 || value > 30) {
                return true
            }
        } else {
            if (value < 1 || value > 31) {
                return true
            }
        }

    }

    function validateYear(value) {
        if (value.length !== 4) {
            return true
        }
    }

    return (
        <ScreenModal heading="Date of Birth" subHeading="When were you born?">
            <Formik initialValues={{
                dob_month: user.dob ? calendar.months[user.dob.split('-')[1] - 1] : 'January',
                dob_day: user.dob ? user.dob.split('-')[2] : 1,
                dob_year: user.dob ? user.dob.split('-')[0] : 2000
            }} onSubmit={async (values) => {
                setLoading(true)
                let month = helpers.getObjectKey(calendar.months, values.dob_month)
                await api.post('user/store', {
                    dob: `${values.dob_year}-${++month}-${values.dob_day}`
                })
                    .then(response => {
                        dispatch(
                            updateUser({
                                ...user,
                                dob: `${values.dob_year}-${month}-${values.dob_day}`
                            })
                        )
                        dispatch(sendNotification({
                            message: 'Your date of birth has been updated'
                        }))
                        //setLoading(false)
                        dispatch(closeModal())
                    })
            }}>
                {({values, errors}) => (
                    <Form id="screen-modal-form" loading={loading}>
                        <div id="birthday-form">
                            <Select name="dob_month" label="Month"
                                    error={(errors.dob_day || errors.dob_year) ? 'Please enter a valid date' : false}>
                                {Object.values(calendar.months).map(month => (
                                    <option key={`dob-month-${month}`}>{month}</option>
                                ))}
                            </Select>
                            <Field name="dob_day" label="Day"
                                   validate={value => validateDay(value, values.dob_month, values.dob_year)}
                                   error={errors.dob_day}/>
                            <Field name="dob_year" label="Year" validate={validateYear} error={errors.dob_year}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default DateOfBirth
