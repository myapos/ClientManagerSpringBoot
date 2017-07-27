export default registrations => {
  const sumAr = registrations.map(curAr => curAr.find(item => typeof item !== 'undefined'));
  let count = 1;
  const s__ = sumAr.map((item, index1) =>
    item.map((item2, index2) => {
      // item2.index = (index1 + index2 + 1);
      item2.index = count;
      count++;
      return item2;
    }));
  return s__.reduce((sum, value) => sum.concat(value));
};
