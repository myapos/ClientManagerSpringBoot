import React from 'react';

const NotFound = () => (
  <div> Hello from NotFound </div>
);

NotFound.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default NotFound;

