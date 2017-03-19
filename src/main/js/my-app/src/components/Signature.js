import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import '../css/App.css';
import { connect } from 'react-redux';
import * as api from '../api';
import * as actions from '../actions/';

class Signature extends Component {

	render () {

		return(
			<div className="signaturePosition">
			    <h5>Contact Info: <a href="mailto:myapos@yahoo.com">myapos@yahoo.com</a></h5>
				<h5>v: 1.0 @ 2017</h5>
			</div>
			)

	}

}


export default connect(state => state, actions)(Signature);
