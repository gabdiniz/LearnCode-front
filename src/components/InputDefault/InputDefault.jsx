import { forwardRef } from "react";
import "./InputDefault.scss";
import { Form } from "react-bootstrap";

export const InputDefault = forwardRef(({ placeholder, classNameGroup, classNameControl, label, type, required, err, ...props }, ref) => {

  return (
    <Form.Group className={`form-group-default ${classNameGroup}`}>
      {label &&
        <Form.Label>{label}</Form.Label>
      }
      <Form.Control
        ref={ref}
        className={`form-control-default ${classNameControl}`}
        placeholder={placeholder}
        type={type ? type : "text"}
        required={required ? required : false}
        {...props}
      />
      {
        err
        &&
        <Form.Text className="invalid-feedback">
          {err}
        </Form.Text>
      }
    </Form.Group>
  )
});