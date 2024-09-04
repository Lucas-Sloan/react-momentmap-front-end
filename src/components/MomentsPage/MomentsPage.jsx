import { useState, useEffect } from 'react';
import MomentList from '../../components/MomentList/MomentList';
import MomentForm from '../../components/MomentForm/MomentForm';
import * as momentService from '../../services/momentService';
import './MomentsPage.css';

const MomentsPage = () => {
  const [moments, setMoments] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchMoments = async () => {
      const fetchedMoments = await momentService.index();
      const sortedMoments = fetchedMoments.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMoments(sortedMoments);
    };
    fetchMoments();
  }, []);

  const handleCreateToggle = () => {
    setIsCreating(!isCreating);
  };

  const handleFormSubmit = async (newMomentData) => {
    try {
      const newMoment = await momentService.create(newMomentData);
      const updatedMoments = [...moments, newMoment].sort((a, b) => new Date(a.date) - new Date(b.date));
      setMoments(updatedMoments);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating moment:', error);
    }
  };

  return (
    <main>
      <header>
        <h1>Moments</h1>
        <button onClick={handleCreateToggle}>
          {isCreating ? 'Cancel' : 'Create New Moment'}
        </button>
      </header>

      {isCreating && <MomentForm onSubmit={handleFormSubmit} />}

      <MomentList moments={moments} />
    </main>
  );
};

export default MomentsPage;