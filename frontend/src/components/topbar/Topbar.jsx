import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from 'react-router-dom'
import "./topbar.css"
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">ConnectSocial</span>
            </Link>
        </div>
        
        <div className="topbarCenter">
            <div className="searchBar">
            <SearchIcon className='searchIcon'/>
            <input placeholder="Search for friend, post or video" className="searchInput" />
            </div>
        </div>

        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">
                    HomePage
                </span>
                <span className="topbarLink">
                    Timeline
                </span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                <PersonIcon/>
                <span className="topbarIconBadge">1</span>

                </div>
                <div className="topbarIconItem">
                <NotificationsIcon/>
                <span className="topbarIconBadge">1</span>

                </div>

                <div className="topbarIconItem">
                <ChatIcon/>
                <span className="topbarIconBadge">1</span>

                </div>
                
            </div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture || PF + "noavatar.jpeg"} alt="" className="topbarImg" />
            </Link>
        </div>
    </div>
  )
}
