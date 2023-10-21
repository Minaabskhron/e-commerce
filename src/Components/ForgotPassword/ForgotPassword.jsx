import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const email = document.querySelector("#email");
  let emailValue;
  const [value, setValue] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function getEmailValue() {
    emailValue = email.value;
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  async function forgetPassord() {
    try {
      toast.loading("Wait for our email", { duration: 1000 });
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: emailValue,
        }
      );
      toast.success("Check your email");
      localStorage.setItem('email',emailValue)
      navigate("/verifyCode");
      return data;
    } catch (error) {
      setErrMsg(error.response.data.message);
      toast.error(errMsg);
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="container w-75 m-auto p-4">
        <div>
          <label className="mb-3" htmlFor="email">
            Enter your Email:
          </label>
          <input
            className="form-control"
            type="text"
            name=""
            id="email"
            value={value}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              getEmailValue();
              forgetPassord();
            }}
            className="btn btn-danger mt-3"
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
