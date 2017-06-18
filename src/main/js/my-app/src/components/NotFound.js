import React from 'react';

const NotFound = () => <div> The page that you requested has not found </div>;

NotFound.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default NotFound;

