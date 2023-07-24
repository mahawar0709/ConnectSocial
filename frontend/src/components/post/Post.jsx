import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { format} from 'timeago.js';
import { AuthContext } from "../../context/AuthContext";
export default function Post({key,post}) {
  const[like,setLike] = useState(post.likes.length)
  const[isliked,setisLiked] = useState(false)
  const[user,setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext) 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:3001/api/users?userId=${post.userId}`)
      
      setUser(res.data)
    }
    fetchUsers()
  },[post.userId])

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:3001/api/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}><img
              className="postProfileImg"
              src={user.profilePicture || PF+"noavatar.jpeg"}
              alt=""
            /></Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}/like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}/heart.jpg`} onClick={likeHandler}  alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}