import { useState } from "react";

const UseForm = (callBack, initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    callBack();
  };

  return { values, handleChange, handleSubmit };
};

export default UseForm;
