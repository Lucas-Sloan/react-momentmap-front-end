import './Landing.css'; 
import mapIcon from '../../assets/Moment-Map-Icon-inverse.png';

const Landing = ({ openSigninModal, openSignupModal }) => {
  return (
    <main className="landing-container">
      <h1 className="landing-title">Welcome to Moment Map</h1>
      <div className="landing-image">
        <img src={mapIcon} alt="Map Icon" />
      </div>
      <p className="landing-text">
        <span className="landing-link" onClick={openSignupModal}>Sign up</span> or 
        <span className="landing-link" onClick={openSigninModal}> Sign in</span> to track your moments
      </p>
    </main>
  );
};

export default Landing;