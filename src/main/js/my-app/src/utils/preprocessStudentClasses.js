export default (classes, property) => {
  const values = item => item[property];
  // debugger;
  // return classes.map(item => {item.property), property };
  return classes.map(item => values(item));
};
