import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Navbar from "../../../components/navbar/Navbar";
import SideBar from "../../../components/sidebar/SideBar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { useFormik } from "formik";
import { formSubmit } from "../../../API/BaseUrl";

function AddPdf() {
  const [file, setFile] = useState({});
  const [formData,setFormData] = useState({});

  useEffect(()=>{
    setFormData({...formData,...file})
  },[file])
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData,'on submit');
    formSubmit(formData)
    // let formdata = new FormData();
    // formdata.append("firstName", e.target.firstName.value);
    // formdata.append("image", image);
  };
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((prev)=>({ ...prev,[name]:value }))
    console.log(formData,'dadsfad')
  }

  const fileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
        let file = e.target.files[0];
        setFile({ file: file })
    }
  }
//   const formik = useFormik({
//     initialValues: {
//       fileName: "",
//       file: "",
//     },
//     onSubmit: (values) => {
//       console.log(values);
//       formSubmit(values);
//     },
//   });
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div className="mainbody">
          <div
            className="container"
            style={{ padding: "20px", width: "100%", height: "100vh" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 500,
                  height: 500,
                  // backgroundColor: 'primary.dark',
                  border: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <DriveFolderUploadIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Upload File
                </Typography>
                {/* <Box component="form" sx={{
                                    mt: 5, width: 300,
                                    height: 300,
                                }} > */}
                <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        autoComplete="given-name"
                        name="fileName"
                        required
                        fullWidth
                        id="fileName"
                        label="File Name"
                        autoFocus
                        value={formData.fileName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        name="file"
                        required
                        fullWidth
                        id="file"
                        type="file"
                        autoFocus
                        onChange={fileChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Upload
                  </Button>
                </form>

                {/* </Box> */}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPdf;
