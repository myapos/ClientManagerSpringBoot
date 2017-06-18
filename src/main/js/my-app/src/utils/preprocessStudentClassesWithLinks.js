export default async classes => {
  const classesPromises = await classes.map(async item => {
    console.log('item:', item);
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
    console.log('subClassInfo:', subClassInfo);
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
