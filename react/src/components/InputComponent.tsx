import React from 'react'

interface inputProps {
    type: "text" | "password" | "email" | "number" | "date";
    id?: string
    name: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
}

const InputComponent = React.forwardRef<HTMLInputElement, inputProps>((props: inputProps, ref) => {
    const {
        name,
        required = false,
        className = "",
        ...rest
    } = props;

    // console.log("🚀 ~ file: UiTextField.jsx ~ line 14 ~meta",  meta)
    // console.log("🚀 ~ file: UiTextField.jsx ~ line 14 ~ field", field)

    return (
        <React.Fragment>
            <label htmlFor={name} className="form-label text-capitalize">
                {name}
                {required && <span className="text-danger">*</span>}
            </label>
            <input className={`form-control ${className}`} name={name} id={name} {...rest} ref={ref} />
        </React.Fragment >
    )
});

export default InputComponent