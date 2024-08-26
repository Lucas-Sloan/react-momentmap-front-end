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
    console.error(error);
  }
};

export { create };
