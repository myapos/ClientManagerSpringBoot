export default (subClass, studentClassesWithLinks) => {
  let subClassLink;
  studentClassesWithLinks.map(item => {
    if (item.parentClass === subClass) {
      subClassLink = item._links.self.href;
    }
  });
  return subClassLink;
};
