import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling
import { loginApiFunc } from '../../api/api';
import Loading from '../../components/Loader/Loading';
import { recievedError, requestSent, responseRecieved } from '../../slices/utilsSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let loadingState = useSelector(state => state.utilsObj.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {

      dispatch(requestSent());
      const response = await loginApiFunc(email, password);

      if(response.status === 200) {
        dispatch(responseRecieved())
        localStorage.setItem("token", response.data.data.resetToken)
        navigate("/user-tasks")
      }
     
    } catch (error) {

      console.log("error=>", error);
      dispatch(recievedError(error));
      dispatch(responseRecieved());
      if(error.response.status === 400) setError(error.response.data.error)
      else setError("Something went wrong")
      
    }
  };

  return (
    loadingState ? <Loading/> :
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Start your journey</h2>
        <h4 style={{color: 'red', marginTop: '5px'}}>{error}</h4>
        <div className="form-group">
          <label class='login-form-label'>Email</label>
          <input
            type="email"
            value={email}
            className='login-input'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label class='login-form-label'>Password</label>
          <input
            type="password"
            value={password}
            className='login-input'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='login-btn'>Login</button>
        <p className='bottom-line'>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;