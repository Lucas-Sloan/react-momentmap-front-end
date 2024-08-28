// src/components/MomentList/MomentList.jsx
import { Link } from 'react-router-dom';
import './MomentList.css';

const MomentList = ({ moments }) => {
  return (
    <div className="moment-list-container">
      {moments.map((moment) => (
        <div key={moment._id} className="moment-card">
          {moment.image && <img src={moment.image} alt={moment.title} />}
          <h3>{moment.title}</h3>
          <p>{new Date(moment.date).toLocaleDateString()}</p>
          <p>{moment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MomentList;