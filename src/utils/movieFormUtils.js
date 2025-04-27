export const handleMovieFormSubmit = async ({
  formData,
  method,
  apiUrl,
  navigate,
}) => {
  if (!formData) {
    navigate('/');
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method === 'POST' ? 'add' : 'edit'} movie`);
    }

    const responseData = await response.json();

    if (responseData.id) {
      navigate(`/${responseData.id}`);
    } else {
      console.error('Response does not contain an ID');
    }
  } catch (error) {
    console.error(`Error submitting form (${method}):`, error);
  }
};
