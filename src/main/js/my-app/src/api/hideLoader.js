/* hide all loaders*/
export default className => {
  // debugger;
  console.log('preparing to hide loader with className', className);
  const loader = document.getElementsByClassName(className)[0];

  // match className with tab order to compare with lastTabLoaded from localstorage
  let tabFromClassName = 0;
  if (className === 'loader students') {
    tabFromClassName = 1;
  } else if (className === 'loader registers') {
    tabFromClassName = 2;
  } else if (className === 'loader payments') {
    tabFromClassName = 3;
  } else if (className === 'loader studentClasses') {
    tabFromClassName = 4;
  }
  // get last active tab  from localStorage
  console.log('localStorage.lastTabLoaded:', localStorage.lastTabLoaded);
  // find out if there are data loaded in active tab
  // debugger;
  if (1 || (parseInt(localStorage.lastTabLoaded)+1) === tabFromClassName) {
    loader.style.display = 'none';
  }
  // when className contains the info of the current tab and there are data
  // then hide loader
};

