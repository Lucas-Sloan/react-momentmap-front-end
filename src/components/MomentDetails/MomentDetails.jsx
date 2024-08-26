// src/components/MomentDetails/MomentDetails.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as momentService from '../../services/momentService';
import MomentForm from '../MomentForm/MomentForm'; // Import MomentForm

const MomentDetails = () => {
  const { momentId } = useParams();
  const [moment, setMoment] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode

  useEffect(() => {
    const fetchMomentDetails = async () => {
      try {
        const momentData = await momentService.show(momentId); // Fetch the moment by ID
        setMoment(momentData);
      } catch (error) {
        console.error('Error fetching moment details:', error);
      }
    };

    fetchMomentDetails();
  }, [momentId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the edit mode
  };

  const handleFormSubmit = async (updatedMoment) => {
    try {
      const updated = await momentService.update(momentId, updatedMoment);
      setMoment(updated);
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating moment:', error);
    }
  };

  if (!moment) return <p>Loading...</p>;

  return (
    <main>
      <article>
        <header>
          <h1>{moment.title}</h1>
          <p>
            {moment.createdBy?.username} posted on {new Date(moment.createdAt).toLocaleDateString()}
          </p>
          <button onClick={handleEditToggle}>
            {isEditing ? 'Cancel Edit' : 'Edit Moment'}
          </button>
        </header>
        {isEditing ? (
          <MomentForm initialData={moment} onSubmit={handleFormSubmit} />
        ) : (
          <>
            {moment.image && <img src={moment.image} alt={moment.title} />}
            <p>{moment.description}</p>
            <p>
              <strong>Date:</strong> {new Date(moment.date).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {moment.location}
            </p>
            <section>
              <h2>Guests</h2>
              {moment.guests.length > 0 ? (
                <ul>
                  {moment.guests.map((guest) => (
                    <li key={guest._id}>
                      {guest.firstName} {guest.lastName} - RSVP: {guest.RSVP ? 'Yes' : 'No'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No guests added yet.</p>
              )}
            </section>
            <section>
              <h2>Schedule</h2>
              {moment.schedule.length > 0 ? (
                <ul>
                  {moment.schedule.map((event, index) => (
                    <li key={index}>
                      {event.time} - {event.eventDescription}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No events scheduled yet.</p>
              )}
            </section>
          </>
        )}
      </article>
    </main>
  );
};

export default MomentDetails;
