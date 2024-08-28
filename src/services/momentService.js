// src/services/momentService.js
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/moments`;

// Fetch all moments
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Fetch a single moment by ID
const show = async (momentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Create a new moment
const create = async (momentData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(momentData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Update an existing moment
const update = async (momentId, momentData) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(momentData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Delete a moment
const remove = async (momentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${momentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create, update, remove };