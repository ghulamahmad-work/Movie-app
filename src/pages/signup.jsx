import { Link } from "react-router-dom";
import "./signup.css";
import Footer from "../components/footer";
import TrendingNow from "../components/trendingNow_SignUp";

export default function SignUp() {
  return (
    <>
      <div className="signup-page">
        <div className="logo">FilmVault</div>
        <div className="signin-link-container">
          <Link className="signin-link" to="/signin">
            Sign In
          </Link>
        </div>
        <div className="centeral-area">
          <h1>Watch countless movies, TV series, and more</h1>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <div className="email-area">
            <input type="email" placeholder="Email address" autoFocus/>
            <button>Get Started</button>
          </div>
        </div>
        <div className="trending-container">
          <TrendingNow />
          <hr />
           {/*Doing this for the footer adjustment*/}
          <Footer fixed={false} />
        </div>
      </div>
    </>
  );
}
