// src/components/MomentList/MomentList.jsx
import { Link } from 'react-router-dom';
import './MomentList.css';

const MomentList = ({ moments }) => {
  return (
    <div className="moment-list-container">
      {moments.map((moment) => (
        <Link to={`/moments/${moment._id}`} key={moment._id} className="moment-card-link">
          <div className="moment-card">
            {moment.image && <img src={moment.image} alt={moment.title} />}
            <h3>{moment.title}</h3>
            <p>{new Date(moment.date).toLocaleDateString()}</p>
            <p>{moment.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MomentList;