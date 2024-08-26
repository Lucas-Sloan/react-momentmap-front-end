// src/components/GuestForm/GuestForm.jsx
import { useState } from 'react';

const GuestForm = ({ onSubmit }) => {
  const [guestData, setGuestData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    RSVP: false,
    plusOne: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGuestData({
      ...guestData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(guestData);
    setGuestData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      RSVP: false,
      plusOne: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={guestData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={guestData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={guestData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={guestData.message}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="RSVP">RSVP:</label>
        <input
          type="checkbox"
          id="RSVP"
          name="RSVP"
          checked={guestData.RSVP}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="plusOne">Plus One:</label>
        <input
          type="checkbox"
          id="plusOne"
          name="plusOne"
          checked={guestData.plusOne}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Guest</button>
    </form>
  );
};

export default GuestForm;
