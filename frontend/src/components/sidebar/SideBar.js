import React from 'react'
import "../sidebar/sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SourceIcon from '@mui/icons-material/Source';
import { useNavigate } from "react-router-dom";

const sidebardata = [
    {
        title: "Home",
        icon: <HomeIcon  />,
        link: "/"
    },
    {
        title: "Add File",
        icon: <FileDownloadIcon  />,
        link: "/uploadpdf"
    },
    {
        title: "View File",
        icon: <SourceIcon  />,
        link: "/viewfile"
    }
]




function SideBar() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='sidebar'>
               
                <ul className="siderbarList">
                {sidebardata.map((item,key)=>{
                    return (
                        <li
                         key={key}
                         className="sidebarRow"
                         onClick={()=>navigate(item.link)}
                         >
                            {" "}
                            <div className="icon">{item.icon}</div>
                            <div className="title">
                                {item.title}
                            </div>
                        </li>
                        )
                })}
                </ul>
            </div>
        </div>
    )
}

export default SideBar
