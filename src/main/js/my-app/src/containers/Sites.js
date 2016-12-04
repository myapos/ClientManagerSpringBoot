import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/';

import { connect } from 'react-redux';
// import * as actions from '../actions/';
// import logo from '../logo.svg';
// import './App.css';
// import './toggler.css';
// import Toggle from 'react-toggle';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Sites extends Component {

    advChange(val) {
        //debugger;
        console.log("Selected: ", val);
        const siteids = val.map(item => item.value)
        this.props.addSites(this.props.index, siteids);
    }


    render() {
    	console.log('sites', this.props.advertiser_data.sites);
      return (
            <Select name="form-field-name"
	            value={this.props.advertiser_data.sites.join()}
	            options={this.props.data.sites}
	            multi={true}
	            clearable={false}
	            onChange={this.advChange.bind(this)}
	            placeholder = "Select site(s)"
	            className = "sitesSelect"
	            />
        );
    }
}

export default connect(state => state, actions)(Sites);
