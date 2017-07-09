export default studentClassesWithLinks => {
  const results = [];
  console.log('studentClassesWithLinks:', studentClassesWithLinks);
  // checking all possible combination in order to build output results
  studentClassesWithLinks.map(item1 => {
    let ok = true;
    for (let i = 0; i < studentClassesWithLinks.length; i++) {
      if (item1.parentClass === studentClassesWithLinks[i].subClass) {
        ok = false;
        break;
      }
    }
    if (ok) {
      results.push(item1);
    }
  });
  return results;
};
