import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext)
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value}, dispatch);
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ConnectSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ConnectSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" type="email" className="loginInput" ref={email} required />
            <input placeholder="Password" type="password" className="loginInput" ref={password} required />
            <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress style={{color:"white",size:"10px"}}/> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
            <button className="loginRegisterButton">
            {isFetching ? <CircularProgress style={{color:"white",size:"10px"}}/> : "Create a new account"}
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}