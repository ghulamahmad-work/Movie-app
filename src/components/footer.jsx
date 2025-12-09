import "./footer.css";

export default function Footer({ fixed = true }) {
  return (
    <div className={fixed ? "footer footer-signin" : "footer footer-signup"}>
      <p className="footer-question">Questions? Contact us.</p>

      <div className="footer-grid">
        <div className="footer-column">
          <p>FAQ</p>
          <p>Corporate Information</p>
        </div>

        <div className="footer-column">
          <p>Cookie Preferences</p>
          <p>Terms of Use</p>
        </div>

        <div className="footer-column">
          <p>Help Center</p>
          <p>Privacy</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 FilmVault. All rights reserved.</p>
      </div>
    </div>
  );
}
