//src/components/Landing/Landing.jsx
import './Landing.css'; 
import { Link } from 'react-router-dom'; 
import mapIcon from '../../assets/Moment-Map-Icon-inverse.png';

const Landing = () => {
  return (
    <main className="landing-container">
      <h1 className="landing-title">Welcome to Moment Map</h1>
      <div className="landing-image">
        <img src={mapIcon} alt="Map Icon" />
      </div>
      <p className="landing-text">
        <Link to="/signup" className="landing-link">Sign up</Link> or <Link to="/signin" className="landing-link">Sign in</Link> to track your moments
      </p>
    </main>
  );
};

export default Landing;