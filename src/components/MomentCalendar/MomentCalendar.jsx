// src/components/MomentCalendar/MomentCalendar.jsx
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as momentService from '../../services/momentService';
import * as calendarService from '../../services/calendarService';

const MomentCalendar = () => {
  const [moments, setMoments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchMoments = async () => {
      try {
        const fetchedMoments = await momentService.index();
        setMoments(fetchedMoments);
      } catch (error) {
        console.error('Error fetching moments:', error);
      }
    };

    fetchMoments();
  }, []);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSyncWithGoogleCalendar = async () => {
    try {
      const response = await calendarService.syncWithGoogleCalendar(moments);
      console.log('Synced with Google Calendar:', response);
    } catch (error) {
      console.error('Error syncing with Google Calendar:', error);
    }
  };

  const handleGoogleAuth = () => {
    const token = localStorage.getItem('token');
    document.cookie = `token=${token}; path=/`;

    window.location.href = 'http://localhost:3000/auth/google';
  };

  const renderMomentsOnDate = (date) => {
    const momentsOnDate = moments.filter(moment =>
      new Date(moment.date).toDateString() === date.toDateString()
    );
    return momentsOnDate.map(moment => (
      <div key={moment._id}>
        <strong>{moment.title}</strong> - {new Date(moment.date).toLocaleTimeString()}
      </div>
    ));
  };

  return (
    <div>
      <h2>Moment Calendar</h2>
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => view === 'month' && renderMomentsOnDate(date)}
      />
      {/* Button to start the Google OAuth flow */}
      <button onClick={handleGoogleAuth}>
        Connect with Google Calendar
      </button>
      <br />
      {/* Button to sync moments with Google Calendar after authentication */}
      <button onClick={handleSyncWithGoogleCalendar}>
        Sync Moments with Google Calendar
      </button>
    </div>
  );
};

export default MomentCalendar;