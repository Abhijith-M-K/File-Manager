import React from 'react';
import Navbar from "../../../components/navbar/Navbar";
import SideBar from "../../../components/sidebar/SideBar";

function userHome() {
  return (
    <div>
      <Navbar/>
      <div style={{display:"flex"}}>
        <SideBar/>
        <div className="mainbody">
            <h1>Home</h1>
        </div>
      </div>
    </div>
  )
}

export default userHome
