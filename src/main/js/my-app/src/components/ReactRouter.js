import React from 'react';

const ReactRouter = () => (
  <div> Hello from ReactRouter </div>
);

ReactRouter.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ReactRouter;
