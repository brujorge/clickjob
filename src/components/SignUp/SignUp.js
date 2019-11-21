import React, { useState, useContext } from "react";
import { Formik, Field, Form } from "formik";
import { Redirect, Link } from "@reach/router";
import axios from "axios";

import UserContext from "components/Context/UserContext";

import Logo from "assets/images/logo.png";

import SignUpSchema from "./SignUpSchema";
import styles from "./styles.module.scss";

const SignUp = ({ handleSuccessfulAuth }) => {
  const user = useContext(UserContext);
  const [error, setError] = useState(null);
  if (user) {
    return <Redirect to="/" noThrow />;
  }
  const handleSubmit = ({ email, password, passwordConfirmation }) => {
    axios
      .post(
        "https://clickjob-api.herokuapp.com/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === 500) {
          setError("Email already exists.");
        }
        if (response.data.status === "created") {
          handleSuccessfulAuth(response.data.user);
        }
      })
      .catch(error => {
        console.log("Registration failed", error);
      });
  };
  return (
    <div className={styles.signUp}>
      <div className={styles.signUpForm}>
        <img className={styles.logo} src={Logo} alt="clickjob logo" />
        <h2>Sign up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirmation: ""
          }}
          onSubmit={handleSubmit}
          validationSchema={SignUpSchema}
          isInitialValid={false}
        >
          {({ isValid }) => (
            <Form>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="your@email.com" />
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="passwordConfirmation">
                  Password confirmation
                </label>
                <Field
                  id="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm your password"
                />
              </div>
              <button disabled={!isValid} type="submit">
                SIGN UP
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.note}>
          Already have an account yet? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
