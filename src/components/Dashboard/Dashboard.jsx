// src/components/Dashboard/Dashboard.jsx
import { AuthedUserContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import MomentForm from '../MomentForm/MomentForm';
import MomentList from '../MomentList/MomentList';
import MomentCalendar from '../MomentCalendar/MomentCalendar';
import * as momentService from '../../services/momentService';
import './Dashboard.css';

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    const fetchMoments = async () => {
      const fetchedMoments = await momentService.index();
      const sortedMoments = fetchedMoments.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMoments(sortedMoments);
    };
    fetchMoments();
  }, []);

  const handleCreateMoment = async (momentData) => {
    try {
      const newMoment = await momentService.create(momentData);
      setMoments([...moments, newMoment].sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error('Error creating moment:', error);
    }
  };

  return (
    <main className="dashboard-container">
      <h1>{user.username}'s Dashboard</h1>

      <div className="dashboard-content">
        <div className="moment-form">
          <h2>Create a Moment</h2>
          <MomentForm onSubmit={handleCreateMoment} />
        </div>

        <div className="moment-list">
          <h2>Upcoming Moments</h2>
          <MomentList moments={moments.slice(0, 2)} onMomentCreated={handleCreateMoment} />
        </div>

        <div className="moment-calendar">
          <h2> Moment Calendar</h2>
          <MomentCalendar showTitle={false} showControls={false} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
