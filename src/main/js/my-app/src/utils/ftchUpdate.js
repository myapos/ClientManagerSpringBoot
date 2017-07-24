/* wrapper function for fetching from database */

export default (url, method_, mode_, body_) => fetch(url,
  {
    method: method_,
    body: body_,
    mode: mode_,
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  });
