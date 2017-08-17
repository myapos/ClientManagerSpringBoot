/* ar is array, prop is property in array for example dateOfRegistration */
export default (ar, prop) =>
  ar.map(function (item) {
    console.log('log:', this);
    const formatedDate = new Date(item[this]);
    item[this] = formatedDate.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
    return item;
  }, prop);
