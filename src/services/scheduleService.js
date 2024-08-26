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
    console.error(error);
  }
};

export { create };