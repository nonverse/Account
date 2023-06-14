import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";
import Form from "../../../elements/Form";
import Select from "../../../elements/Select";
import world from "../../../scripts/helpers/world";
import Field from "../../../elements/Field";
import validate from "../../../scripts/validate";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import helpers from "../../../scripts/helpers/helpers";
import auth from "@/scripts/auth.js";
import loader from "@/components/Loader.jsx";
import Loader from "@/components/Loader.jsx";

const RecoveryPhone = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState({
        form: false,
        modal: true
    })
    const dispatch = useDispatch()

    useEffect(() => {
        async function initialise() {
            await auth.authorizationToken('update_recovery_phone')
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
        <ScreenModal heading="Recovery Phone" subHeading="Add a phone number for emergencies" loading={loading.modal}>
            {user.recovery ? (
                <Formik initialValues={{
                    phone_country: user.recovery.phone ? `${helpers.getObjectItem(world.countries, 'dial_code', user.phone.split('-')[0]).dial_code} ${helpers.getObjectItem(world.countries, 'dial_code', user.recovery.phone.split('-')[0]).name}` : '+61 Australia',
                    phone: user.recovery.phone ? user.recovery.phone.split('-')[1] : ''
                }} onSubmit={(values) => {
                    setLoading(true)

                    dispatch(updateUser({
                        ...user,
                        recovery: {
                            ...user.recovery,
                            phone: `${values.phone_country.split(' ')[0]}-${values.phone}`
                        }
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
                                <Field name="phone" label="Recovery Phone"
                                       validate={value => validate.require(value, 4, 12)}
                                    // TODO Better & complete phone number validation
                                       error={errors.phone ? 'Please enter a valid phone number' : ''}/>
                            </div>
                            <div id="screen-modal-text">
                                <p>
                                    Adding a recovery phone number helps you re-gain access to your account in the event
                                    that
                                    you lose access to your primary e-mail and phone
                                    <br/>
                                    <br/>
                                    You WILL NOT receive account notifications or promotions via this phone
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="screen-modal-await-loader">
                    <Loader/>
                </div>
            )}
        </ScreenModal>
    )
}

export default RecoveryPhone
