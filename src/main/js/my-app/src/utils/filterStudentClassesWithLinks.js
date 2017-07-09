import * as constants from '../constants';

export default studentClassesWithLinks => {
  const results = [];
  const products = [{
    index: 1,
    parentClass: 'Product1',
    subClass: 'http://testurl',
  },
  {
    index: 2,
    parentClass: 'Product2',
    subClass: 'http://testurl',
  }];
  console.log('studentClassesWithLinks:', studentClassesWithLinks);
  // checking all possible combination in order t build output results
  studentClassesWithLinks.map(item1 => {
    // studentClassesWithLinks.map(item2 => {
    //   console.log('Now comparing item1', item1, ' and item2', item2);
    //   // debugger;
    //   if (item1.parentClass !== item2.subClass) {
    //     // debugger;
    //     results.push(item1);
    //     return;
    //   }
    // });
    let ok = true;
    for (let i = 0; i < studentClassesWithLinks.length; i++) {
      if(item1.parentClass === studentClassesWithLinks[i].subClass) {
        ok = false;
        break;
      }
    }
    // debugger;
    if (ok) {
      results.push(item1);
    }
  });
  return results; // studentClassesWithLinks;
};
