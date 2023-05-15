import {Form as FormikForm} from "formik";

const Form = ({id, children}) => {

    return (
        <FormikForm id={id}>
            {children}
            <button type="submit">Done</button>
        </FormikForm>
    )
}

export default Form 