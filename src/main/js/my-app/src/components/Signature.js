import React from 'react';

const Signature = () => (
  <div className="signaturePosition">
    <h5>Contact Info: <a href="mailto:myapos@yahoo.com">myapos@yahoo.com</a></h5>
    <h5>v: 1.0 @ 2017</h5>
  </div>
);

Signature.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default Signature;
