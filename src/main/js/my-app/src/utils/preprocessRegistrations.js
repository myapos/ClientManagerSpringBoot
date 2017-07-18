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

  // debugger;
  const reg_ = [];
  sumAr.forEach((item, index) => {
    console.log('item:', item);
    item.map(i => {
      reg_.push(i);
      return i;
    });
  // debugger;

  console.log('log:', reg_);
  });
  return reg_;
};
