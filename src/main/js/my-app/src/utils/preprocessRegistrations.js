export default registrations =>
  registrations.map(item => {
    const formatedDate = new Date(item.dateOfRegistration);
    item.dateOfRegistration = formatedDate.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
    return item;
  });
