// src/components/MomentList/MomentList.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MomentForm from '../MomentForm/MomentForm'; // Import the MomentForm component
import * as momentService from '../../services/momentService'; // Import the momentService

const MomentList = (props) => {
  const [isCreating, setIsCreating] = useState(false); // State to toggle the form
  const [moments, setMoments] = useState(props.moments); // Local state for moments

  const handleCreateToggle = () => {
    setIsCreating(!isCreating);
  };

  const handleFormSubmit = async (newMomentData) => {
    try {
      const newMoment = await momentService.create(newMomentData);
      setMoments([...moments, newMoment]); // Add the new moment to the list
      setIsCreating(false); // Hide the form after creating a new moment
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

      {isCreating && (
        <MomentForm onSubmit={handleFormSubmit} />
      )}

      {moments.map((moment) => (
        <Link key={moment._id} to={`/moments/${moment._id}`}>
          <article>
            <header>
              <h2>{moment.title}</h2>
              <p>
                {moment.createdBy.username} posted on 
                {new Date(moment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{moment.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default MomentList;
