// src/components/MomentDetails/MomentDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as momentService from '../../services/momentService';
import * as guestService from '../../services/guestService';
import * as scheduleService from '../../services/scheduleService';
import MomentForm from '../MomentForm/MomentForm';
import GuestForm from '../GuestForm/GuestForm';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import './MomentDetails.css';

const MomentDetails = () => {
  const { momentId } = useParams();
  const navigate = useNavigate();
  const [moment, setMoment] = useState(null);
  const [editingGuest, setEditingGuest] = useState(null);
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    const fetchMomentDetails = async () => {
      try {
        const momentData = await momentService.show(momentId);
        setMoment(momentData);
      } catch (error) {
        console.error('Error fetching moment details:', error);
      }
    };

    fetchMomentDetails();
  }, [momentId]);

  const handleFormSubmit = async (updatedMoment) => {
    try {
      const updated = await momentService.update(momentId, updatedMoment);
      setMoment(updated);
      navigate('/moments');
    } catch (error) {
      console.error('Error updating moment:', error);
    }
  };

  const handleGuestSubmit = async (guestData) => {
    try {
      let updatedGuests;
      if (editingGuest) {
        updatedGuests = moment.guests.map((guest) =>
          guest._id === editingGuest._id ? { ...guest, ...guestData } : guest
        );
        await guestService.update(momentId, editingGuest._id, guestData);
        setEditingGuest(null);
      } else {
        const newGuest = await guestService.create(momentId, guestData);
        updatedGuests = [...moment.guests, newGuest];
      }
      setMoment({ ...moment, guests: updatedGuests });
    } catch (error) {
      console.error('Error adding or updating guest:', error);
    }
  };

  const handleScheduleSubmit = async (scheduleData) => {
    try {
      let updatedSchedule;
      if (editingSchedule) {
        updatedSchedule = moment.schedule.map((event) =>
          event._id === editingSchedule._id ? { ...event, ...scheduleData } : event
        );
        await scheduleService.update(momentId, editingSchedule._id, scheduleData);
        setEditingSchedule(null);
      } else {
        const newEvent = await scheduleService.create(momentId, scheduleData);
        updatedSchedule = [...moment.schedule, newEvent];
      }
      setMoment({ ...moment, schedule: updatedSchedule });
    } catch (error) {
      console.error('Error adding or updating event:', error);
    }
  };

  const handleDeleteGuest = async (guestId) => {
    try {
      await guestService.remove(momentId, guestId);
      setMoment({
        ...moment,
        guests: moment.guests.filter((guest) => guest._id !== guestId),
      });
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const handleDeleteSchedule = async (eventId) => {
    try {
      await scheduleService.remove(momentId, eventId);
      setMoment({
        ...moment,
        schedule: moment.schedule.filter((event) => event._id !== eventId),
      });
    } catch (error) {
      console.error('Error deleting schedule event:', error);
    }
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
  };

  const handleEditSchedule = (event) => {
    setEditingSchedule(event);
  };

  const handleDeleteMoment = async () => {
    try {
      await momentService.remove(momentId);
      navigate('/moments');
    } catch (error) {
      console.error('Error deleting moment:', error);
    }
  };

  if (!moment) return <p>Loading...</p>;

  return (
    <main className="moment-details-container">
      <header>
        <h1>Manage Your Moment</h1>
      </header>
      <div className="moment-forms">
        <div className="moment-edit">
          <h2>Edit your Moment</h2>
          <MomentForm initialData={moment} onSubmit={handleFormSubmit} />
        </div>

        <div className="guest-form">
          <h2>Add or Edit a Guest</h2>
          <GuestForm
            initialData={editingGuest || {}}
            onSubmit={handleGuestSubmit}
            onCancel={() => setEditingGuest(null)}
            isEditing={!!editingGuest}
          />
        </div>

        <div className="schedule-form">
          <h2>Schedule</h2>
          <ScheduleForm
            initialData={editingSchedule || {}}
            onSubmit={handleScheduleSubmit}
            onCancel={() => setEditingSchedule(null)}
            isEditing={!!editingSchedule}
          />

          {moment.schedule.length > 0 ? (
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {moment.schedule.map((event) => (
                  <tr key={event._id}>
                    <td>{event.time}</td>
                    <td>{event.eventDescription}</td>
                    <td>
                      <button onClick={() => handleEditSchedule(event)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteSchedule(event._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events scheduled yet.</p>
          )}
        </div>
      </div>

      <div className="guest-list">
        <h2>Guest List:</h2>
        <div className="guest-list-grid">
          {moment.guests.length > 0 ? (
            moment.guests.map((guest) => (
              <div key={guest._id} className="guest-card">
                <p>
                  {guest.firstName} {guest.lastName} {guest.RSVP && <span>✔️ RSVP</span>}
                  {guest.plusOne && <span> +1</span>}
                </p>
                <button onClick={() => handleEditGuest(guest)}>Edit</button>
                <button onClick={() => handleDeleteGuest(guest._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No guests added yet.</p>
          )}
        </div>
      </div>

      <button className="delete-button" onClick={handleDeleteMoment}>Delete Moment</button>
    </main>
  );
};

export default MomentDetails;