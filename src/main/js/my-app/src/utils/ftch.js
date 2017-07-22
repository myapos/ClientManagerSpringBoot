/* wrapper function for fetching from database */

export default (url, method_, mode_) => fetch(url,
  {
    method: method_,
    mode: mode_,
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.json();
  });
