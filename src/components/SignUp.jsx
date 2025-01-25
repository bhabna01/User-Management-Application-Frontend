// import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
// import axios from "axios";
// import img from "../assets/login.jpg"
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//     const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/register", {
//         name,
//         email,
//         password,
//       });
//       setSuccess(response.data.message);
//       setError("");
//       setName("");
//       setEmail("");
//       setPassword("");
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong");
//       setSuccess("");
//     }
//   };
//     return (
//         <div className="d-flex vh-100">
//       {/* Left Side */}
//       <div className="w-50 d-flex flex-column justify-content-center align-items-center">
//         <h1 className="mb-4" style={{ color: "#0056E0", fontWeight: "bold" }}>
//           THE APP
//         </h1>
//         <form
//           style={{ width: "80%", maxWidth: "400px" }}
//           onSubmit={handleSignup}
//         >
//           <h3 className="mb-3">Get Started</h3>
//           <h4 className="mb-4">Sign Up for The App</h4>
//           {error && <div className="alert alert-danger">{error}</div>}
//           {success && <div className="alert alert-success">{success}</div>}
//           {/* Name Field */}
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <FaUser />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//           </div>
//           {/* Email Field */}
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               E-mail
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <FaEnvelope />
//               </span>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="test@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>
//           {/* Password Field */}
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <FaLock />
//               </span>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           {/* Sign Up Button */}
//           <button type="submit" className="btn btn-primary w-100">
//             Sign Up
//           </button>
//         </form>
//         {/* Links */}
//         <div className="mt-3">
//           <a href="/login">Already have an account? Sign in</a>
//         </div>
//       </div>
//       {/* Right Side (Background) */}
//       <div
//         className="w-50"
//         style={{
//           background: `url(${img}) center/cover no-repeat`,
//         }}
//       ></div>
//     </div>
//     );
// };

// export default SignUp;
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import img from "../assets/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import toast, { Toaster } from "react-hot-toast";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      // Show success toast
      toast.success(response.data.message || "Signup successful!");

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to home page
      navigate("/");
    } catch (err) {
      // Show error toast
      toast.error(err.response?.data?.error || "Something went wrong");
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
          onSubmit={handleSignup}
        >
          <h3 className="mb-3">Get Started</h3>
          <h4 className="mb-4">Sign Up for The App</h4>

          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
                <FaLock />
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

          {/* Sign Up Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        {/* Links */}
        <div className="mt-3">
          <a href="/login">Already have an account? Sign in</a>
        </div>
      </div>

      {/* Right Side (Background) */}
      <div
        className="w-50"
        style={{
          background: `url(${img}) center/cover no-repeat`,
        }}
      ></div>

      {/* Toast Container */}
     
    </div>
  );
};

export default SignUp;