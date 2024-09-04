import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as momentService from '../../services/momentService';
import * as calendarService from '../../services/calendarService';
import './MomentCalendar.css';

const MomentCalendar = ({ showControls = true, showTitle = true }) => {
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
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
  
    document.cookie = `token=${token}; path=/; SameSite=None; Secure`;
  
    window.location.href = 'https://moment-map-1e3caa864534.herokuapp.com/auth/google';
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
      {showTitle && <h2>Moment Calendar</h2>}
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => view === 'month' && renderMomentsOnDate(date)}
      />
      {showControls && (
        <div className="calendar-controls">
          <button onClick={handleGoogleAuth}>
            Connect with Google Calendar
          </button>
          <button onClick={handleSyncWithGoogleCalendar}>
            Sync Moments with Google Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default MomentCalendar;