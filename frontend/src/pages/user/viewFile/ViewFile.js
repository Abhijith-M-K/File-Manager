// import * as React from 'react';
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../../../components/navbar/Navbar";
import SideBar from "../../../components/sidebar/SideBar";
import axios from "axios";
import { BaseUrl, deleteFile } from "../../../API/BaseUrl";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MdDelete } from "react-icons/md";

function ViewFile() {
  const [pdf, setPdf] = useState();

  useEffect(() => {
    pdfData();
  }, []);

  const pdfData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BaseUrl}/api/user/findfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data, "askdabfkjsdbfs");
      if (response.data.success) {
        setPdf(response.data.data);
      } else {
        console.log("error");
      }
    } catch (error) {}
  };
  console.log(pdf);

  const download = async (item) => {
    try {
      fetch(`${item.fileid}`).then((response) => {
        console.log(response);
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = `${item.filename}`;
          alink.click();
        });
      });
    } catch (err) {}
  };

  const handleDelete = (id, userId) => {
    deleteFile(id, userId);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div className="mainbody">
          <div className="container" style={{ width: "100%", height: "100vh" }}>
            <div style={{ width: "100%", height: "100%", padding: "50px" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell align="right">Dowload</TableCell>
                      <TableCell align="right">Remove</TableCell>
                      {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pdf?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell component="th" scope="row">
                          <img
                            style={{ width: "150px", height: "130px" }}
                            src={row.fileid}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => download(row)}>
                            <FileDownloadIcon />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <MdDelete
                            onClick={() => handleDelete(row._id, row.userid)}
                          />
                        </TableCell>
                        {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">1</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFile;
