export default async classes => {

  const { _embedded: { studentClasses } } = classes;
  const classesPromises = await studentClasses.map(async item => {
    // console.log('item:', item);
    const url = item._links.studentClass[1].href;

    const response = await fetch(url, {
      method: 'get',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
        'Content-Type': 'application/json',
      },
    });

    const subClassInfo = await response.json();
    subClassInfo.parentClass = item.description;
    subClassInfo._links = item._links;

    // console.log('subClassInfo:', subClassInfo);
    return subClassInfo;
  });

  const classesResults = [];
  let index = 1;
  let tempClass = {};

  for (const class_ of classesPromises) {

    const t = await class_;
    const subClass = t.description;
    const parentClass = t.parentClass;
    const _links = t._links;
    // debugger;
    tempClass = {
      index,
      subClass,
      parentClass,
      _links,
    };
    classesResults.push(tempClass);
    index++;
  }
  console.log('classesResults:', classesResults);
  // return classes;

  return classesResults;
};
