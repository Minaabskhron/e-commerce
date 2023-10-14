import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authentication";

export default function Login() {

  const {setToken} = useContext(authContext)

  const [errMsg,setErrMsg] = useState(null)
  const [succesMsg, setSuccesMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  async function loginToAccount(values)
  {
    setIsLoading(true);
    try {
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);

      if (data.message === "success")
      {
        setSuccesMsg("Welcome back");
        localStorage.setItem('token',data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      }



    } catch (error) {
      setErrMsg(error.response.data.message);
    }

    setIsLoading(false);
    
  }

  const formikObj = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: loginToAccount,

    validate:function(values)
    {
      setErrMsg(null);
      const errors={};
      const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z)(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,32}$/

      if (!emailRegex.test(values.email))
      {
        errors.email = "Invalid Email" 
      }

      if (!passwordRegex.test(values.password))
      {
        errors.password = "Password length must be at least 8 charaters and must contain at least one small character ,one capital ,one special character"
      }

      return errors;
    }
  });

  return (
    <>
      <section className="w-75 m-auto">
        <div className="container">
          {errMsg?<div className="alert alert-danger">{errMsg}</div>:""}
          {succesMsg?<div className="alert alert-success">{succesMsg}</div>:""}

          <h4>Login:</h4>

          <form onSubmit={formikObj.handleSubmit}>

            <label htmlFor="email" className="mb-2">email:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} id="email"  className="form-control mb-2" type="email" />
            {formikObj.errors.email && formikObj.touched.email?<div className="alert alert-danger">{formikObj.errors.email}</div>: " "}

            <label htmlFor="password" className="mb-2">password:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.password} id="password"  className="form-control mb-2" type="password" />
            {formikObj.errors.password && formikObj.touched.password?<div className="alert alert-danger">{formikObj.errors.password}</div>: " "}

            <button type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false} className="btn btn-primary">
              {isLoading?<RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />:"Login"}
              
            </button>
            
          </form>
        </div>
      </section>
    </>
  );
}
