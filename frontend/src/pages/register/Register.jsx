import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
export default function Register() {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const passwordAgain = useRef()
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:3001/api/auth/register", user);
        navigate('/login')
      } catch (err) {
        console.log(err);
      }
    }
  };
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
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" ref={username} className="loginInput" />
            <input placeholder="Email" ref={email} type="email" className="loginInput" />
            <input placeholder="Password" ref={password} type="password" className="loginInput" />
            <input placeholder="Password Again" ref={passwordAgain} type="password" className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login">
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}