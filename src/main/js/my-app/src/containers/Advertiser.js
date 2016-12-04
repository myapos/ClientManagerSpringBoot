import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/';

import { connect } from 'react-redux';
// import * as actions from '../actions/';
// import logo from '../logo.svg';
// import './App.css';
// import './toggler.css';
// import Toggle from 'react-toggle';
import Select from 'react-select';
import Sites from './Sites';
import 'react-select/dist/react-select.css';


class Advertiser extends Component {

    advChange(val) {
        //debugger;
        console.log("Selected: ", val);
        this.props.changeAdvertiser(this.props.index, val.value);
    }


    render() {
      return (
       <li>
            <Select name="form-field-name"
	            value={this.props.advertiser_data.id}
	            options={this.props.data.advertisers}
	            clearable={false}
	            onChange={this.advChange.bind(this)}
	            placeholder = "Select advertiser"
	            />

	            {
	            this.props.advertiser_data.id>0 ?
	            	<Sites advertiser_data={this.props.advertiser_data} index={this.props.index}> </Sites>
	            	:null
	            }
	            <span type="button" className="deletebtn" onClick={() => this.props.deleteAdvertiser(this.props.index)}></span>
	 </li>
        );
    }
}

export default connect(state => state, actions)(Advertiser);
