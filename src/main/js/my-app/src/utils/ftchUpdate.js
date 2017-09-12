/* wrapper function for fetching from database */

export default (url, method_, mode_, body_) => fetch(url,
  {
    method: method_,
    body: body_,
    mode: mode_,
    cache: 'default',
    headers: {
      'Authorization': localStorage.getItem('jwt-token'), 
      'Content-Type': 'application/json',
    },
  });
