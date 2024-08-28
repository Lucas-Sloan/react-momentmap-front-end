const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/moments`;

const create = async (momentId, scheduleData) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(scheduleData),
    });
    return res.json();
  } catch (error) {
    console.error('Error creating schedule event:', error);
  }
};

const index = async (momentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/schedule`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching schedule events:', error);
  }
};

const update = async (momentId, scheduleId, scheduleData) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/schedule/${scheduleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(scheduleData),
    });
    return res.json();
  } catch (error) {
    console.error('Error updating schedule event:', error);
  }
};

const remove = async (momentId, scheduleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/schedule/${scheduleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error('Error deleting schedule event:', error);
  }
};

export { create, index, update, remove };