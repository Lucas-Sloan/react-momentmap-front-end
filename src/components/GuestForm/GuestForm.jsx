// src/components/GuestForm/GuestForm.jsx
import { useState, useEffect } from 'react';


const GuestForm = ({ initialData = {}, onSubmit, onCancel, isEditing }) => {
  const [guestData, setGuestData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    RSVP: false,
    plusOne: false,
  });

  useEffect(() => {
    if (isEditing) {
      setGuestData(initialData);
    } else {
      setGuestData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        RSVP: false,
        plusOne: false,
      });
    }
  }, [initialData, isEditing]);

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
  };

  const handleCancel = () => {
    setGuestData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      RSVP: false,
      plusOne: false,
    });
    onCancel();
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
      <div className="form-actions">
        <button type="submit">Submit</button>
        {isEditing && (
          <button type="button" onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default GuestForm;
