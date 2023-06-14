import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import Form from "../../../elements/Form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Field from "../../../elements/Field";
import Select from "../../../elements/Select";
import world from "../../../scripts/helpers/world";
import helpers from "../../../scripts/helpers/helpers";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";
import validate from "../../../scripts/validate";
import auth from "@/scripts/auth.js";

const Phone = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState({
        form: false,
        modal: true
    })
    const dispatch = useDispatch()
    const country = helpers.getObjectItem(world.countries, 'dial_code', user.phone.split('-')[0])

    useEffect(() => {
        async function initialise() {
            await auth.authorizationToken('update_phone')
                .then(response => {
                    if (response.data.data.success) {
                        setLoading({
                            ...loading,
                            modal: false
                        })
                    }
                })
        }

        initialise()
    })

    return (
        <ScreenModal heading="Phone" subHeading="What's your phone number?" loading={loading.modal}>
            <Formik initialValues={{
                phone_country: `${country.dial_code} ${country.name}`,
                phone: user.phone.split('-')[1]
            }} onSubmit={(values) => {
                setLoading(true)

                dispatch(updateUser({
                    ...user,
                    phone: `${values.phone_country.split(' ')[0]}-${values.phone}`
                }))

                setTimeout(() => {
                    setLoading(false)
                    dispatch(closeModal())
                }, 500)
            }}>
                {({errors}) => (
                    <Form id="screen-modal-form" loading={loading.form}>
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
        </ScreenModal>
    )
}

export default Phone
