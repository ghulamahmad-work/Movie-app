import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./signin.css";
import Footer from "../components/footer";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
// For the redirecting of the user to detailpage 
  const redirectToDetailPage = location.state?.redirectToDetailPage;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

   if (username === "abc" && password === "aaa") {
  if (redirectToDetailPage) {
    navigate(`/details/${redirectToDetailPage}?type=movie`);
  } else {
    navigate("/dashboard");
  }
} else {
  setError("Invalid username or password");
}
  };

  return (
    <>
      <div className="signin-page">
        <div className="logo">FilmVault</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="Username (abc)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (aaa)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <div className="remember-area">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button type="submit">Login</button>
          <p>
            New to FilmVault?&nbsp;
            <Link to="/signup" className="signup-link">
              Sign Up Now
            </Link>
          </p>
        </form>
      </div>
      {/*Did this for the footer adjustment*/}
      <Footer fixed={true} />
    </>
  );
}
