import { FaEnvelope, FaEye } from "react-icons/fa";
import img from "../assets/login.jpg"
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token); // Ensure token is stored
      console.log('Token stored:', response.data.token); // Debugging: Log the token
      navigate('/admin'); // Redirect to admin panel
    } catch (error) {
      alert(error.response.data.error);
    }
  };
    return (
      <div className="d-flex vh-100">
      {/* Left Side */}
      <div className="w-50 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4" style={{ color: "#0056E0", fontWeight: "bold" }}>
          THE APP
        </h1>
        <form
          style={{ width: "80%", maxWidth: "400px" }}
          onSubmit={handleLogin}
        >
          <h3 className="mb-3">Start your journey</h3>
          <h4 className="mb-4">Sign In to The App</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEye />
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Remember Me Checkbox */}
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label htmlFor="rememberMe" className="form-check-label">
              Remember me
            </label>
          </div>
          {/* Sign In Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
        {/* Links */}
        <div className="mt-3">
          <Link to="/signup" className="me-3">
            Don&apos;t have an account? Sign up
          </Link>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
      {/* Right Side (Background) */}
      <div
        className="w-50"
        style={{
          background: `url(${img}) center/cover no-repeat`,
        }}
      ></div>
    </div>
    );
};

export default Login;