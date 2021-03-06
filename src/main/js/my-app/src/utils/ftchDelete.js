/* wrapper function for fetching deletefrom database */

export default (url, method_, mode_) => fetch(url,
  {
    method: method_,
    mode: mode_,
    cache: 'default',
    headers: {
      'Authorization': localStorage.getItem('jwt-token'),//`Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  });
