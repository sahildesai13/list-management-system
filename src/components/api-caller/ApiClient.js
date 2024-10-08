export const apiClient = async (url, { method = 'GET', headers = {}, body = null, params = null } = {}) => {
  const fullUrl = params ? `${url}/${params}` : url;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorMessage = await response.text(); // Get text response
      throw new Error(errorMessage || 'Error fetching data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return { error: error.message };
  }
};
