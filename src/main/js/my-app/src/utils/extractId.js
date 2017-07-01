export default url => {
  console.log('url:', url);
  const tokens = url.split('/');
  // get id
  const id = tokens[tokens.length - 1];
  return parseInt(id);
};
