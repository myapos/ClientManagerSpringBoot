/* hide all loaders*/
export default className => {
  // debugger;
  console.log('preparing to hide loader with className');
  const loader = document.getElementsByClassName(className)[0];
  loader.style.display = 'none';
};

