import ScreenModal from "../../ScreenModal";
import {Formik} from "formik";
import Form from "../../../elements/Form";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../elements/Select";
import {useState} from "react";
import {updateUser} from "../../../state/user";
import {closeModal} from "../../../state/app/modal";
import api from "@/scripts/api.js";
import {sendNotification} from "@/state/app/notification.js";


const Gender = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    return (
        <ScreenModal heading="Gender" subHeading="What do you identify as?">
            <Formik initialValues={{
                gender: user.gender ? user.gender : 'Male'
            }} onSubmit={async (values) => {
                setLoading(true)
                await api.post('user/store', {
                    ...values
                })
                    .then(response => {
                        dispatch(updateUser({
                            ...user,
                            ...values
                        }))
                        // setLoading(false)
                        dispatch(sendNotification({
                            message: 'Your gender has been updated',
                        }))
                        dispatch(closeModal())
                    })
            }}>
                {() => (
                    <Form id="screen-modal-form" loading={loading}>
                        <div id="gender-form">
                            <Select name="gender" label="Gender">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Select>
                        </div>
                    </Form>
                )}
            </Formik>
        </ScreenModal>
    )
}

export default Gender
