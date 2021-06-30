import { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import UseForm from "../../src/util/hooks/useForm";
import { AuthContext } from "../context/authContext";

const Register = ({ history }) => {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { values, handleChange, handleSubmit } = UseForm(registerCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_INPUT, {
    update(proxy, {data:{registerUser:userData}}) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerCallback() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={handleChange}
        />

        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          error={errors.password ? true : false}
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Register</Button>
      </Form>
      <div className="ui error message">
        <ul className="list">
          {Object.values(errors).map(error => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

const REGISTER_INPUT = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      createdAt
      username
      token
    }
  }
`;

export default Register;
