export default (classes, property) => {
  let studentClasses = classes;
  if (property === 'description') {
    studentClasses = classes._embedded.studentClasses;
  }
  const values = item => item[property];
  return studentClasses.map(item => values(item));
};
