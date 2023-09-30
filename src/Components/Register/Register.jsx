import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {


  const [errMsg,setErrMsg] = useState(null)
  const [succesMsg, setSuccesMsg] = useState(null)
  const [isLaoding, setIsLaoding] = useState(false)

  const navigate = useNavigate();

  async function registerNewUser(values)
  {
    setIsLaoding(true);
    try {
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
      setSuccesMsg("Account has been created succesfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setErrMsg(error.response.data.message);
    }

    setIsLaoding(false);
    
  }

  const formikObj = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: registerNewUser,

    validate:function(values)
    {
      setErrMsg(null);
      const errors={};
      const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z)(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,32}$/
      const phoneRegex = /^(02)?01[0125][0-9]{8}$/

      if (!(values.name.length>=3 && values.name.length<12))
      {
        errors.name = "Name length must be between 3 and 12 characters"
      }

      if (!emailRegex.test(values.email))
      {
        errors.email = "Invalid Email" 
      }

      if (!passwordRegex.test(values.password))
      {
        errors.password = "Password length must be at least 8 charaters and must contain at least one small character ,one capital ,one special character"
      }

      if (values.password!=values.rePassword)
      {
        errors.rePassword = "Passwords do not match"
      }

      if (!values.phone.match(phoneRegex))
      {
        errors.phone = "Enter a valid phone"
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

          <h4>Register Now:</h4>

          <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="name" className="mb-2">name:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.name} id="name" className="form-control mb-2" type="text" />
            {formikObj.errors.name && formikObj.touched.name?<div className="alert alert-danger">{formikObj.errors.name}</div>: " "}

            <label htmlFor="email" className="mb-2">email:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} id="email"  className="form-control mb-2" type="email" />
            {formikObj.errors.email && formikObj.touched.email?<div className="alert alert-danger">{formikObj.errors.email}</div>: " "}

            <label htmlFor="password" className="mb-2">password:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.password} id="password"  className="form-control mb-2" type="password" />
            {formikObj.errors.password && formikObj.touched.password?<div className="alert alert-danger">{formikObj.errors.password}</div>: " "}

            <label htmlFor="rePassword" className="mb-2">repassword:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.rePassword} id="rePassword"  className="form-control mb-2" type="password" />
            {formikObj.errors.rePassword && formikObj.touched.rePassword?<div className="alert alert-danger">{formikObj.errors.rePassword}</div>: " "}

            <label htmlFor="phone" className="mb-2">phone:</label>
            <input onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.phone} id="phone"  className="form-control mb-2" type="tel" />
            {formikObj.errors.phone && formikObj.touched.phone?<div className="alert alert-danger">{formikObj.errors.phone}</div>: " "}

            <button type="submit" disabled={formikObj.isValid == false || formikObj.dirty == false} className="btn btn-primary">
              {isLaoding?<RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />:"Register"}
              
            </button>
            
          </form>
        </div>
      </section>
    </>
  );
}
