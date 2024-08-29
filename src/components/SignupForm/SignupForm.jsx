import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SignupForm.css';

const SignupForm = ({ setUser, onClose }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      setUser(newUserResponse.user);
      onClose();
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, email, password } = formData;

  const isFormInvalid = () => {
    return !(username && email && password);
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button" disabled={isFormInvalid()}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;