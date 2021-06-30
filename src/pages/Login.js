import { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import UseForm from "../../src/util/hooks/useForm";
import { AuthContext } from "../context/authContext";

const Login = ({ history }) => {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { values, handleChange, handleSubmit } = UseForm(loginCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginCallback() {
    loginUser();
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
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
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

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      createdAt
      username
      token
    }
  }
`;

export default Login;
