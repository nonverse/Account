import {Field as FormikField} from "formik";

const Select = ({name, label, children}) => {

    return (
        <FormikField name={name}>
            {({field: {value}, form: {setFieldValue}}) => (
                <div className="field-wrapper">
                    <span className="field-label">{label}</span>
                    <select id={name} className="field" defaultValue={value}>
                        {children}
                    </select>
                </div>
            )}
        </FormikField>
    )
}

export default Select