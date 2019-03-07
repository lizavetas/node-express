import { useState } from 'react';

// https://github.com/BenMagyar/form-hooks/blob/master/examples/basic/pages/index.js

export default function useForm({
                          initialValues,
                          onSubmit,
                          validate,
                          validateOnChange = true,
                        }) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  function handleValidate() {
    return Promise.resolve(validate(values))
      .then(errors => setErrors(errors));
  }

  function handleChange(event) {
    const { name } = event.target;

    if (!name) {
      return;
    }

    setValues({ ...values, [name]: event.target});

    if (validateOnChange) {
      handleValidate();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitCount(submitCount + 1);
/*
    const fields = [...Object.keys(values), ...Object.keys(initialValues)];
    setTouched(Object.assign({}, ...fields.map(k => ({ [k]: true }))));*/

    return Promise.resolve(validate(values))
      .then(errors => {
        setErrors(errors);
        if (!Object.keys(errors).length) {
          return Promise.resolve(onSubmit(values));
        }
      })
      .then(() => setIsSubmitting(false))
      .catch(error => {
        setIsSubmitting(false)
        return Promise.reject(error);
      });
  }

  return {
    errors,
    values,
    handleChange,
    handleSubmit,
    setErrors,
    isSubmitting
  }
}