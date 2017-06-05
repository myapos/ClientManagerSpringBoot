export default () => {
  fetch(
        `${parent.BASE_URL}/api/registers`, {
          method: 'get',
          mode: 'cors',
          cache: 'default',
          headers: {
            'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
            'Content-Type': 'application/json',
          } })
    .then(res => res.json())
    .then(res => {
      const registers = res._embedded.registers;
      parent.registers = registers;
      return registers;
    });
};
