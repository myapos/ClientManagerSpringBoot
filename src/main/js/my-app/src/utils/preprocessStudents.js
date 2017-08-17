export default students_ => {

  let students;
  if (!Array.isArray(students_)) {
    // students = students_.students;
    students = students_._embedded.students;
  } else {
    students = students_;
  }

  students.map((obj, index) => {
    const date = new Date(obj.dateOfBirth);
    const formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
    obj.dateOfBirth = formatedDate;
    obj.index = (index + 1);
    return obj;
  });
  return students;
};
