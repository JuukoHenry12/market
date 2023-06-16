import React,{useEffect} from "react";
import { Form, Button,Input, message } from "antd";
import {RegisterUser } from '../../apiCalls/user'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLoader } from "../../redux/loaderSlice";

const rules= [
  {
    required: true,
    message:"required"
  }
]

function Register () {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const onFinish =async(values)=>{
   try{
    dispatch(setLoader(true))
    const response = await RegisterUser(values)
      navigate("/login")
      dispatch(setLoader(false))
     if(response.success){
        message.success(response.message)
   
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
        <h2 className="mb-2 text-center  font-bold">Register</h2>
        <Form layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="name" rules={rules} required/>
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type="email" placeholder="email" rules={rules}/>
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="password" placeholder="password" rules={rules}/>
          </Form.Item>
          <Button type="primary" htmlType="submit" block danger>Register</Button>
         <span>
          Already have an account ? <a href="/login">Login</a>
         </span>
        </Form>
        
      </div>
   
    </div>
  );
};

export default Register;
