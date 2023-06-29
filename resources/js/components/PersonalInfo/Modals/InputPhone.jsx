import {Formik} from "formik";
import Form from "../../../elements/Form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Field from "../../../elements/Field";
import Select from "../../../elements/Select";
import world from "../../../scripts/helpers/world";
import helpers from "../../../scripts/helpers/helpers";
import validate from "../../../scripts/validate";
import api from "@/scripts/api.js";
import {closeModal} from "@/state/app/modal.js";

const InputPhone = ({user, progress, setPhone}) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <Formik initialValues={{
                phone_country: user.phone ? `${helpers.getObjectItem(world.countries, 'dial_code', user.phone.split('-')[0]).dial_code} ${helpers.getObjectItem(world.countries, 'dial_code', user.phone.split('-')[0]).name}` : '+61 Australia',
                phone: user.phone ? user.phone.split('-')[1] : ''
            }} onSubmit={async (values) => {
                setLoading(true)
                if ((user.phone === `${values.phone_country.split(' ')[0]}-${values.phone}`) && user.phone_verified_at) {
                    return dispatch(closeModal())
                }
                await api.post('auth/send-verification', {
                    channel: 'phone',
                    phone: `${values.phone_country.split(' ')[0]}-${values.phone}`
                })
                    .then(response => {
                        if (response.data.success) {
                            setPhone(`${values.phone_country.split(' ')[0]}-${values.phone}`)
                            progress()
                        }
                    })
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" cta="Continue" loading={loading}>
                        <div id="phone-form">
                            <Select name="phone_country" label="Country">
                                {world.countries.map(country => (
                                    <option
                                        key={`phone-country-${country.name}`}>{`${country.dial_code} ${country.name}`}</option>
                                ))}
                            </Select>
                            <Field name="phone" label="Phone" validate={value => validate.require(value, 4, 12)}
                                // TODO Better & complete phone number validation
                                   error={errors.phone ? 'Please enter a valid phone number' : ''}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default InputPhone
