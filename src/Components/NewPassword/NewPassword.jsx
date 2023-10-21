import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import {  useNavigate } from "react-router-dom";
import { authContext } from "../../context/authentication";
import { Helmet } from "react-helmet";

export default function NewPassword() {
  const { setToken } = useContext(authContext);

  const [errMsg, setErrMsg] = useState(null);
  const [succesMsg, setSuccesMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emailValue = localStorage.getItem("email");
  const navigate = useNavigate();

  async function loginToAccount(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      setSuccesMsg("Password changed successfully");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      localStorage.removeItem("email");
      
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error);
    }

    setIsLoading(false);
  }

  const formikObj = useFormik({
    initialValues: {
      email: emailValue,
      newPassword: "",
    },
    onSubmit: loginToAccount,

    validate: function (values) {
      setErrMsg(null);
      const errors = {};

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z)(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,32}$/;

      if (!passwordRegex.test(values.newPassword)) {
        errors.newPassword =
          "Password length must be at least 8 charaters and must contain at least one small character ,one capital ,one special character";
      }

      return errors;
    },
  });

  return (
    <>
      <Helmet>
        <title>Change password</title>
      </Helmet>

      <section className="w-75 m-auto">
        <div className="container">
          {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
          {succesMsg ? (
            <div className="alert alert-success">{succesMsg}</div>
          ) : (
            ""
          )}

          <h4>Change your password:</h4>

          <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="email" className="mb-2">
              email:
            </label>
            <input
              onChange={emailValue}
              onBlur={formikObj.handleBlur}
              value={emailValue}
              id="email"
              className="form-control mb-2"
              type="email"
            />
            {formikObj.errors.email && formikObj.touched.email ? (
              <div className="alert alert-danger">{formikObj.errors.email}</div>
            ) : (
              " "
            )}

            <label htmlFor="newPassword" className="mb-2">
              New password:
            </label>
            <input
              onChange={formikObj.handleChange}
              onBlur={formikObj.handleBlur}
              value={formikObj.values.newPassword}
              id="newPassword"
              className="form-control mb-2"
              type="password"
            />
            {formikObj.errors.newPassword && formikObj.touched.newPassword ? (
              <div className="alert alert-danger">
                {formikObj.errors.newPassword}
              </div>
            ) : (
              " "
            )}

            <button
              type="submit"
              disabled={
                formikObj.isValid === false || formikObj.dirty === false
              }
              className="btn btn-primary"
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              ) : (
                "change Password"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
