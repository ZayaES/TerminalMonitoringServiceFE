import "./Login.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [authToken, setToken] = useState('');
  const [adminData, setAdminData] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      console.log(email, password);
      const response = await axios.post('http://localhost:5237/api/v1/Account/Login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        withCredentials: false,
      });
      
      
      const { admin, token, successful, errorMessage } = response.data;
      if(successful) {
        setToken(token);
        setAdminData(admin);
        setError(errorMessage);

        console.log("login");


        // const sessionCookie = response.headers['Set-Cookie'];\

        localStorage.setItem('authToken', token['token']);
        history('/dashboard');
        console.log(authToken);
      } else {
        setError('Invalid username or password');
      }
    } catch (e) {
      // console.error('Error logging in:', error);
      setError('An error occurred while logging in. Verify Login Credentials');
    }
  };

  return ( 
    <div className="login">
      <div className="top-section">
        <h2>Group 1 Logo</h2>
      </div>
      <div className="login-form">
        <form action="" onSubmit={handleSubmit}>
          <h2>Login Account</h2>
          <label className="label" for="username">Email</label> 
          <div className="mail-input">
            <MdOutlineMailOutline className="email-icon" />
            <input type="text" id="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <label className="label" for="email">Password</label> 
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
            <span onClick={handleTogglePassword}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div> 
          <span>Forgot Password</span>
          <button type="submit" >Continue</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
   );
}
 
export default Login;