/* wrapper function for fetching from database */

export default (url, method_, mode_, json = true) => fetch(url,
  {
    method: method_,
    mode: mode_,
    cache: 'default',
    headers: {
      'Authorization': localStorage.getItem('jwt-token'),
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (json) {
      return res.json();
    } else {
      return res;
    }
  });
