// src/components/MomentsPage.jsx
import { useState, useEffect } from 'react';
import MomentList from '../../components/MomentList/MomentList';
import MomentForm from '../../components/MomentForm/MomentForm';
import * as momentService from '../../services/momentService';

const MomentsPage = () => {
  const [moments, setMoments] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchMoments = async () => {
      const fetchedMoments = await momentService.index();
      setMoments(fetchedMoments);
    };
    fetchMoments();
  }, []);

  const handleCreateToggle = () => {
    setIsCreating(!isCreating);
  };

  const handleFormSubmit = async (newMomentData) => {
    try {
      const newMoment = await momentService.create(newMomentData);
      setMoments([...moments, newMoment]);
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