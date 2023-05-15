import {Field as FormikField} from "formik";

const Field = ({password, name, label, placeholder, error, validate}) => {

    return (
        <FormikField name={name} validate={validate}>
            {({field: {value}, form: {setFieldValue}}) => (
                <div className="field-wrapper">
                    <span className="field-label">{label}</span>
                    <input id={name} className="field" type={password ? 'password' : 'text'} placeholder={placeholder}
                           defaultValue={value} onChange={(e) => {
                        setFieldValue(name, e.target.value)
                    }}/>
                    <span className="field-error">{error}</span>
                </div>
            )}
        </FormikField>
    )
}

export default Field 