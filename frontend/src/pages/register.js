import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import register from "../authentication/actions/register";
import { AuthContext } from "../authentication/context/AuthProvider";
import "../styles/register.css";

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be longer than 8 characters!";
  }

  if (values.password !== values.repeatedPassword) {
    errors.repeatedPassword = "Passwords do not match!";
  }

  return errors;
};

const Register = () => {
  const { auth, authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
    validate,
    onSubmit: (values) => {
      register(values, history)(authDispatch);
    },
  });

  useEffect(() => {
    return () => {
      if (auth.error) authDispatch({ type: "REMOVE_ERROR" });
    };
  }, [auth]);

  return (
    <>
      <div></div>
      <Container className="bg-dark border-rich-black rounded rounded p-2 text-white">
        <Row>
          <Col className="d-none d-md-block border-wine border-right">
            <Container fluid className="bg-register"></Container>
          </Col>
          <Col className="d-flex column justify-content-center ">
            <h2 className="text-red-violet">Register</h2>
            {auth.error && (
              <Alert
                variant="wine"
                onClose={() => authDispatch({ type: "REMOVE_ERROR" })}
                dismissible
              >
                <p>{auth.error.message}</p>
              </Alert>
            )}
            <Form onSubmit={formik.handleSubmit} className="p-2 form">
              <Form.Group>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  variant="filled"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                ></TextField>
              </Form.Group>
              <Form.Group>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  variant="filled"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                ></TextField>
              </Form.Group>
              <Form.Group>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                ></TextField>
              </Form.Group>
              <Form.Group>
                <TextField
                  fullWidth
                  id="repeatedPassword"
                  name="repeatedPassword"
                  label="Repeat your password"
                  type="password"
                  variant="filled"
                  value={formik.values.repeatedPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.repeatedPassword &&
                    Boolean(formik.errors.repeatedPassword)
                  }
                  helperText={
                    formik.touched.repeatedPassword &&
                    formik.errors.repeatedPassword
                  }
                ></TextField>
              </Form.Group>
              <Form.Group>
                <Button type="submit" variant="red-violet mr-2">
                  Register
                </Button>
                <Link to="/">
                  <Button variant="red-violet">Return</Button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <div></div>
    </>
  );
};

export default Register;
