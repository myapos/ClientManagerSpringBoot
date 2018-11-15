export default studentClassesWithLinks => {
  const results = [];
  console.log('studentClassesWithLinks:', studentClassesWithLinks);
  // checking all possible combination in order to build output results
  let count = 0;
  studentClassesWithLinks.map(item => {
    let ok = true;
    for (let i = 0; i < studentClassesWithLinks.length; i++) {
      if (item.parentClass === studentClassesWithLinks[i].subClass) {
        ok = false;
        break;
      }
    }
    if (ok) {
      count++;
      const { ...tempObj } = item;
      tempObj.index = count;
      results.push(tempObj);
    }
  });
  return results;
};
