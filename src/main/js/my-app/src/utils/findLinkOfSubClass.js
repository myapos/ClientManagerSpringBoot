export default (subClass, studentClassesWithLinks) => {
  let subClassLink;
  studentClassesWithLinks.map(item => {
    if (item.subClass === subClass) {
      subClassLink = item._links.self.href;
    }
  });
  return subClassLink;
};
