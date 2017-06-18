import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';

const Container = props => <div> {props.children} </div>;

Container.propTypes = {
  children: PropTypes.element,
};
export default connect(state => state, actions)(Container);
