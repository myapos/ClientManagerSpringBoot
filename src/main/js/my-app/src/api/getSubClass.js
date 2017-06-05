export default (url, parentDesc) => {
  const fetch1 = fetch(url, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      const classesPair = {};

      classesPair[parentDesc] = res;

      return classesPair;
    });
  return fetch1;
};
