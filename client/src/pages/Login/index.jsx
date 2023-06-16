import React, { useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { LoginUser } from "../../apiCalls/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLoader } from "../../redux/loaderSlice";

const rules= [
  {
    required: true,
    message:"required"
  }
]


const Login = () => {

  const navigate =useNavigate()
  const dispatch =useDispatch()
   const onFinish=async(values)=>{
      try{
          dispatch(setLoader(true))
          const response =await LoginUser(values)
          dispatch(setLoader(false))
          if(response.success){
             message.success(response.message)
             localStorage.setItem("token",response.token)
             navigate("/")
          }else {
             throw new Error(response.message)
          }

      }catch(error){
         dispatch(setLoader(false))
         message.error(error.message)
      }
   }
   
return (
    <div className="h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-3 rounded w-[500px]">
        <h2 className="mb-2 text-center  font-bold">Login</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="email" required/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="password"  required/>
          </Form.Item>
          <Button type="primary" htmlType="submit" block danger>
            Login
          </Button>
          <span>
            i don't have an account ? <a href="/register">sign up</a>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Login;
