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
          <legend><span>Προσθήκη πελάτη - Συμπληρώστε τα πεδία εγγραφής</span> <Link class="back" to="/"> Πίσω </Link></legend>
          {/*Start of add user form*/}
          <div className="container">
            <form role="form" id="my_form" className="col-xs-12">
                    <div className="form-group">
                      <div className="row">
                          <div className="col-xs-2"><label>Όνομα: <input className="form-control" type="text" name="fname" id="fname"/> </label></div>
                          <div className="col-xs-2"><label>Επώνυμο:<input className="form-control" type="text" name="lname" id="lname"/> </label></div>
                          <div className="col-xs-2"><label>Email: <input className="form-control" type="email" name="email" id="email"/> </label></div>
                          <div className="col-xs-2"><label>Κινητό: <input className="form-control" type="number" name="mobile" id="mobile"/></label></div>
                          <div className="col-xs-2">
                          <label>Φύλλο: 
                              <select className="form-control selectwidthauto" name="gender" id="gender">
                                  <option value="Άρρεν">Άρρεν</option>
                                  <option value="Θήλυ">Θήλυ</option>
                              </select>
                          </label>
                          </div>
                          <div className="col-xs-2"><label>Ηλικία: <input className="form-control" type="number" name="age" id="age"/></label></div>
                      </div>
                      <div className="row">   
                          <div className="col-xs-4"><label>Ημερομηνία εγγραφής: <input className="form-control" type="date" name="date" id="date"/></label></div>
                      </div>
                    </div>    
                    <div className="form-group">
                    <fieldset>
                      <legend>Τμήματα</legend>
                      <div className="row"> 
                        <div className="col-xs-2">
                          <label>Kettlebells:
                              <select className="form-control selectwidthauto" name="Kettlebells" id="Kettlebells">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                          </label>
                        </div>
                        <div className="col-xs-2">
                        <label>Made In Brazil:
                              <select className="form-control selectwidthauto" name="Made_In_Brazil" id="Made_In_Brazil">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label>
                        </div>
                        <div className="col-xs-2">
                        <label>Krav Maga Stay Away:
                              <select className="form-control selectwidthauto" name="Krav_Maga_Stay_Away" id="Krav_Maga_Stay_Away">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label>
                        </div>
                        <div className="col-xs-2">
                        <label>Krav Maga Civilian:
                              <select className="form-control selectwidthauto" name="Krav_Maga_Civilian" id="Krav_Maga_Civilian">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label>
                        </div>
                        <div className="col-xs-2">
                        <label>Krav Maga Kiddy:
                              <select className="form-control selectwidthauto" name="Krav_Maga_Kiddy" id="Krav_Maga_Kiddy">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label>
                        </div>
                        <div className="col-xs-2"><label>Krav Maga Kids:
                              <select className="form-control selectwidthauto" name="Krav_Maga_Kids" id="Krav_Maga_Kids">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label>
                        </div>
                      </div>
                      </fieldset>
                    </div>  
                    <div className="form-group"><legend>Επικοινωνία</legend>
                      <div className="row">
                        <div className="col-xs-2"><label>Λήψη sms?:
                               <select className="form-control selectwidthauto" name="sms" id="sms">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label></div>
                        <div className="col-xs-2"><label>Λήψη email?:
                              <select className="form-control selectwidthauto" name="receive_email" id="receive_email">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                        </label></div>
                      </div>
                   </div>  
                   <div className="form-group"><legend>Πληρωμές</legend>
                      <div className="row">
                        <div className="col-xs-2">
                          <label>Πληρωμή?:
                              <select className="form-control" name="payed" id="payed">
                                  <option value="Ναι">Ναι</option>
                                  <option value="Όχι">Όχι</option>
                              </select>
                          </label>
                        </div>
                        <div className="col-xs-4"><label>Ημερομηνία πληρωμής:<input className="form-control" type="date" name="payment_date" id="payment_date"/></label></div>
                      </div>
                     </div>
                   <input type="submit" className="btn btn-default" value="Εγγραφή"/>
               </form>
          </div>
          {/*End of add user form*/}
        </div>
      </div>

    );
  }
}

export default connect(state => state, actions)(AddUser);
