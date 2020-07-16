export const api = (path, options = {}) => {
  return fetch(`http://192.168.1.55:8000${path}`, options)
    .then(res => res.json())
    .then(response => {
      if (!Array.isArray(response) && Object.keys(response).length === 0) {
        throw new Error('Empty Response');
      }

      return response;
    });
    };
