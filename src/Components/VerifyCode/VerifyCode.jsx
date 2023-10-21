import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const code = document.querySelector("#code");
  let codeValue;
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function getCodeValue() {
    codeValue = code.value;
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  async function verifyCodeApi() {
    try {
      toast.loading("Verifying the code", {
        duration: 1000,
      });
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: codeValue,
        }
      );
      toast.success("The code is verified");
      if (data.status === "Success") {
        navigate("/newPassword");
      }
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Verify Password</title>
      </Helmet>
      <div className="container w-75 m-auto p-4">
        <div>
          <label className="mb-3" htmlFor="code">
            Enter the code:
          </label>
          <input
            className="form-control"
            type="text"
            name=""
            id="code"
            value={value}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              getCodeValue();
              verifyCodeApi();
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

export default VerifyCode;
