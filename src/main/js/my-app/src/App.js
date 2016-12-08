import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from './actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
import './App.css';
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
      <h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>
       <div className="container">
              <div className="row">
                <div className="col-xs-11"> <legend> Πίνακας Ελέγχου</legend></div>
                <div className="col-xs-2 positionLogoutLink">
                {/*(gonnaEnd.length>=1)?<Link to="/displayunpaidusers"> <img src="images/bell_.png" alt="warning_bell" 
                                      title="Υπάρχουν απλήρωτες συνδρομές"/>
                                      </Link>:""*/} 
                    <Link to="/"> Αποσύνδεση</Link></div>
              </div>
              <div className="row">
                <div className="col-xs-12"> <Link to="/getallusers">Πελατολόγιο</Link></div>
              </div>
              <div className="row">
                <div className="col-xs-12"> <Link to="/adduser">Προσθήκη πελάτη</Link></div>
              </div>
              <div className="row"> 
                <div className="col-xs-12"> <Link to="/deleteuser">Διαγραφή πελάτη</Link></div>
              </div>
              <div className="row">
                <div className="col-xs-12"> <Link to="/updateuser">Αναζήτηση - ενημέρωση πελάτη</Link></div>
              </div>
              <div className="row">
                <div className="col-xs-12"> <Link to="/importusers">Εισαγωγή πελατών</Link></div>
              </div>
              <div className="row">
                 <div className="col-xs-12"> <Link to="/exportusers">Εξαγωγή πελατών</Link></div>
              </div>
          </div>
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
