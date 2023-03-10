import React from "react";
import './App.css';
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from "react-router-dom";

import UserLogin from "./pages/user/login/UserLogin";
import UserHome from "./pages/user/userHome/userHome";
import Register from "./pages/user/register/UserRegister";
import AddPdf from "./pages/user/Add-PDF/AddPdf";
import ViewFile from "./pages/user/viewFile/ViewFile";
import UserRegister from "./pages/user/register/UserRegister";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/login" element={<UserLogin/>}/>
       <Route path="/" element={<UserHome/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/uploadpdf" element={
        <ProtectedRoutes>
          <AddPdf/>
        </ProtectedRoutes>
       
       }/>
       <Route path="/viewfile" element={
        <ProtectedRoutes>
        <ViewFile/>
      </ProtectedRoutes>
      
       }/>
       <Route path="/usersingup" element={<UserRegister/>}/>

    </Routes>
    
    </BrowserRouter>
   
  );
}

export function ProtectedRoutes({ children }) {
  const user = localStorage.getItem("token");
  if (user !== "" && user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
