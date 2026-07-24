import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <span className="tag">🌱 CarbonTrack</span>

        <h1>
          Track Your Carbon.
          <br />
          <span>Protect Our Planet.</span>
        </h1>

        <p>
          Monitor your daily carbon footprint, understand your
          environmental impact, and build sustainable habits
          for a greener future.
        </p>

        <div className="hero-buttons">

          <Link to="/register">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="secondary-btn">
              Login
            </button>
          </Link>

        </div>

      </section>

      {/* AWARENESS */}

      <section className="awareness">

        <h2>🌍 Why CarbonTrack?</h2>

        <p>
          Climate change affects everyone, and every small action
          makes a difference. CarbonTrack helps users understand
          their carbon footprint, create environmental awareness,
          and encourage sustainable living through simple activity
          tracking and meaningful insights.
        </p>

      </section>

      {/* WORKFLOW */}

      <section className="workflow">

        <h2>🚀 How It Works</h2>

        <div className="workflow-grid">

          <div className="workflow-card">

            <div className="emoji">👤</div>

            <h3>Register</h3>

            <p>Create your account</p>

          </div>

          <div className="workflow-card">

            <div className="emoji">📝</div>

            <h3>Log Activities</h3>

            <p>Record daily activities</p>

          </div>

          <div className="workflow-card">

            <div className="emoji">📊</div>

            <h3>Analyze</h3>

            <p>View your emissions</p>

          </div>

          <div className="workflow-card">

            <div className="emoji">🌱</div>

            <h3>Improve</h3>

            <p>Reduce your impact</p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <h2>🌱 CarbonTrack</h2>

        <p>Track • Analyze • Reduce</p>

        <small>
          © 2026 CarbonTrack. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
};

export default Home;