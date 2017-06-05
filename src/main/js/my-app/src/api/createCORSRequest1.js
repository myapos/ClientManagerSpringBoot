// Create the XHR object.
export default (method, url) => {
  let xhr1 = new XMLHttpRequest();
  if ('withCredentials' in xhr1) {
    xhr1.open(method, url);
    xhr1.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
    xhr1.setRequestHeader('Content-type', 'application/json');
    xhr1.contentType = 'application/json';
  } else if (typeof XDomainRequest !== 'undefined') {
    xhr1 = new XDomainRequest();
    xhr1.open(method, url);
  } else {
    xhr1 = null;
  }
  return xhr1;
};
