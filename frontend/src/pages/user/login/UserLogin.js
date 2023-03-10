import React from 'react'
import Login from '../../../components/login/Login';
import axios from "axios";
import { BaseUrl } from "../../../API/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function UserLogin() {
  const navigate = useNavigate();
 
  const userdata = async (data1) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/user/login`, data1);
      if (response.data.success) {
        toast.success(response.data.message);
        if(response.data.userData){
       
          localStorage.setItem("token", response.data.data);
          
        }else{
          toast.error("user data missing");
        }
        navigate("/");
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something Error");
    }
    
  }
  return (
    <div>
      <Login data={userdata} />
    </div>
  )
}

export default UserLogin
