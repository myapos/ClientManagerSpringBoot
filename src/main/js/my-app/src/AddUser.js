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

class AddUser extends Component {

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
        <div className="labelContainer">
          <legend><span>Προσθήκη πελάτη - Συμπληρώστε τα πεδία εγγραφής</span> <Link className="back" to="/"> Πίσω </Link></legend>
        </div> 
          {/*Start of add user form*/}
         {/* <div className="container">*/}

        <form method="post">
            <div className="form-group">
                <label for="name">Όνομα:</label>
                <input className="addform form-control" type="text" id="firstname" name="user_name" />
            </div>
            <div className="form-group">
                <label for="lastname">Επώνυμο:</label>
                <input className="addform form-control" type="text" id="lastname" name="user_lastname" />
            </div>
            <div className="form-group">
                <label for="mail">E-mail:</label>
                <input className="addform form-control" type="email" id="mail" name="user_mail" />
            </div>
            <div className="form-group">
                <label for="mobile">Κινητό:</label>
                <input className="addform form-control" type="number" id="mobile" name="user_mobile" />
            </div>
            <div className="form-group">
                <label for="gender">Φύλλο:</label>
                <select className="addform form-control" name="gender" id="gender">
                    <option value="Άρρεν">Άρρεν</option>
                    <option value="Θήλυ">Θήλυ</option>
                </select>
            </div>            
            <div className="form-group">
                <label for="age">Ηλικία:</label>
                <input className="addform form-control" type="number" id="age" name="user_age" />
            </div>
            <div className="form-group">
                <label for="registrationDate">Ημερομηνία Εγγραφής:</label>
                <input className="addform form-control" type="date" id="registrationDate" name="user_registration_date" />
            </div>
             <legend><span>Tμήματα Εγγραφής</span></legend>
             <legend><span>Στοιχεία πληρωμής</span></legend>
              <div className="form-group">
                <label for="payment">Πληρωμή:</label>
                <select className="addform form-control" name="payment" id="user_payment">
                    <option value="Ναι">Ναι</option>
                    <option value="Οχι">Οχι</option>
                </select>
              </div> 
            <div className="form-group">
                <label for="paymentDate">Ημερομηνία πληρωμής:</label>
                <input className="addform form-control" type="date" id="paymentDate" name="user_payment_date" />
            </div>
            <div className="button">
                <button className="btn btn-default" type="submit">Εγγραφή</button>
            </div>
        </form>

          {/*</div>*/}
          {/*End of add user form*/}
        
      </div>

    );
  }
}

export default connect(state => state, actions)(AddUser);
