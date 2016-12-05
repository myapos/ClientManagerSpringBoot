import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
// import logo from '../logo.svg';
// import './App.css';
// import './toggler.css';
// import Toggle from 'react-toggle';
// react select

// import Advertiser from './Advertiser';

class App extends Component {

    handleChange(event, myprops) {
        // do something with event.target.checked
        console.log("hey from handlechange ", event);
        if (event.data) {
            event.toggleState(event);
        }
        console.log("changed state succesfully");
    };

  cancelFunction(){
  	console.log("hey form cancel function");
  	//redirect to main dashboard page
  	window.parent.location.href= "/";
   }
  render () {
    return (
      <div className="App" id="content">
      <h2>Welcome to client manager app </h2>
      {/*<fieldset>
      <h6> Title2 </h6>
        
        <div className="fieldset-content">
          <span className = "status_container">
                 <label>
                 <span id = "status">Status</span>
                      <Toggle
                        id = "statusToggler"
                        defaultChecked={this.props.toggle}
                        onChange = {this.handleChange.bind(this, this.props)} />
                  </label>
          </span>
        </div>
       </fieldset>

        <fieldset>
            <h6>Advertisers</h6>
            <div className="fieldset-content">
            	<ul>
            	<li><label>Advertiser </label> <label>Sites </label> </li>

            	{
          			this.props.selected.map((advertiser, index) => <Advertiser
              			advertiser_data={advertiser}
              			index={index}
              			key={index} />)
            	}
            	</ul>
              <span className="foo add addadv" onClick={this.props.addAdvertiser}>+ Add Advertiser Row</span>
            </div>
        </fieldset>

        <div className="container actions clr">
      		<div className="field-wrapper">
      			<button type="button" className="button" onClick={this.props.save}>Save</button>
      		</div> &nbsp; - or - <a onClick={this.cancelFunction.bind(this)}>cancel</a> 
        </div>*/}
      </div>

    );
  }
}

export default connect(state => state, actions)(App);
