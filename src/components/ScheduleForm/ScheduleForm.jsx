import { useState } from 'react';

const ScheduleForm = ({ onSubmit }) => {
  const [scheduleData, setScheduleData] = useState({
    time: '',
    eventDescription: '',
  });

  const timeOptions = [
    '12:00 A.M.', '12:30 A.M.', '1:00 A.M.', '1:30 A.M.', '2:00 A.M.', '2:30 A.M.', 
    '3:00 A.M.', '3:30 A.M.', '4:00 A.M.', '4:30 A.M.', '5:00 A.M.', '5:30 A.M.', 
    '6:00 A.M.', '6:30 A.M.', '7:00 A.M.', '7:30 A.M.', '8:00 A.M.', '8:30 A.M.', 
    '9:00 A.M.', '9:30 A.M.', '10:00 A.M.', '10:30 A.M.', '11:00 A.M.', '11:30 A.M.', 
    '12:00 P.M.', '12:30 P.M.', '1:00 P.M.', '1:30 P.M.', '2:00 P.M.', '2:30 P.M.', 
    '3:00 P.M.', '3:30 P.M.', '4:00 P.M.', '4:30 P.M.', '5:00 P.M.', '5:30 P.M.', 
    '6:00 P.M.', '6:30 P.M.', '7:00 P.M.', '7:30 P.M.', '8:00 P.M.', '8:30 P.M.', 
    '9:00 P.M.', '9:30 P.M.', '10:00 P.M.', '10:30 P.M.', '11:00 P.M.', '11:30 P.M.'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(scheduleData);
    setScheduleData({
      time: '',
      eventDescription: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="time">Time:</label>
        <select
          id="time"
          name="time"
          value={scheduleData.time}
          onChange={handleChange}
          required
        >
          <option value="">Select Time</option>
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          name="eventDescription"
          value={scheduleData.eventDescription}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default ScheduleForm;

