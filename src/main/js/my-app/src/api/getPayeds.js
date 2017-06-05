export default () => {
  fetch(
        `${parent.BASE_URL}/api/payeds`, {
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
      const payeds = res._embedded.payeds;
      parent.payeds = payeds;
        // hideloader('loader payments');
      return payeds;
    });
};
