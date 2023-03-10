// import * as React,{useContext} from 'react';
import React,{useContext,useCallback,useMemo,memo, useState, useEffect} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { context } from "../../UseContext/UseContext";
import { BaseUrl } from "../../API/BaseUrl";
import axios from "axios";

function Navbar() {
  const [empty,SetEmpty]=useState("");
  const {data,setData}=useContext(context);
  const navigate = useNavigate();

  useEffect(()=>{
    uerdata();
  }, [empty])
  console.log(data);
 
  const uerdata= async()=>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BaseUrl}/api/user/userdata`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.data.success){
       
        setData(response.data.data);

      }
    }catch(error){

    }
  }
  
  return (
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#55656D"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FileManagement
          </Typography>
          <div>
            <h4>
            {`${data?.firstname}${data?.lastname}`}
            </h4>
          </div>
          {data?(
             <Button color="inherit" onClick={()=> localStorage.clear()} >
             Logout</Button>
          ):(
            
              <Button color="inherit" onClick={()=>navigate("/login")} >
             Login</Button>
            
          )}
         
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FileManagement
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default memo(Navbar)
