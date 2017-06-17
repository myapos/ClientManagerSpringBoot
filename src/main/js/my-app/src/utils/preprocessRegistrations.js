export default registrations => {
  const sumAr = [];
  let registrations_ = [];
  registrations.map(curAr => {
    // console.log('curAr:', curAr, 'l:', curAr.length);
    for (let i = 0; i < curAr.length; i++) {
      if (typeof curAr[i] !== 'undefined') {
        // console.log('item:', curAr[i], 'l:', curAr[i].length);
        if (curAr[i].length > 0) {
          sumAr.push(curAr[i]);
        }
      }
    }
    return 1;
  });

  registrations_ = sumAr.map((value, index) => {
    value[0].index = index + 1;
    return value[0];
  });
  return registrations_;
};
