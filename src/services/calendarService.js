//src/services/calendarService.js
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/calendar`;

const syncWithGoogleCalendar = async (moments) => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
      const res = await fetch(`${BASE_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify({ moments }), // Send moments to backend for syncing
      });
      return res.json();
    } catch (error) {
      console.error('Error syncing with Google Calendar:', error);
    }
};
  

export { syncWithGoogleCalendar };