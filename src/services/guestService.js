const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/moments`;

const create = async (momentId, guestData) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(guestData),
    });
    return res.json();
  } catch (error) {
    console.error('Error creating guest:', error);
  }
};

const index = async (momentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/guests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching guests:', error);
  }
};

const update = async (momentId, guestId, guestData) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(guestData),
    });
    return res.json();
  } catch (error) {
    console.error('Error updating guest:', error);
  }
};

const remove = async (momentId, guestId) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}/guests/${guestId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error('Error deleting guest:', error);
  }
};

export { create, index, update, remove };