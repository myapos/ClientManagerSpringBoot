import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class InsertPaymentRegistersModal extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    initPayments: PropTypes.array,
    onModalClose: PropTypes.func,
    onSave: PropTypes.func,
    columns: PropTypes.array,
    validateState: PropTypes.object,
    ignoreEditable: PropTypes.bool,
    availableClasses: PropTypes.array,
    createRegisters: PropTypes.func,
    updatePaymentRegisters: PropTypes.func,
  }

  handleSaveBtnClick () {
    const { columns, updatePaymentRegisters } = this.props;
    const newRow = {};
    columns.forEach(column => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    updatePaymentRegisters(newRow, 'addPayment');
  }

  render () {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      initDataStudents,
      initDataStudentClasses,
      initPayments,
    } = this.props;

    const paymentTypes = ['true', 'false'];

    return (
      <div style={{ backgroundColor: '#4c2727' }} className="modal-content">
        <h2 style={{ color: '#fff', marginLeft: '10px' }}>Προσθήκη πληρωμής</h2>
        <div className="container-fluid">
          {
            columns.map(column => {
              const {
                field,
                name,
                hiddenOnInsert,
              } = column;

              if (hiddenOnInsert) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              const error = validateState[field] ? (<span className="help-block bg-danger">{ validateState[field] }</span>) : null;
              if (field === 'fname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Όνομα</label>
                    <select ref={field} className="form-control">
                      {
                        initDataStudents.map((el, j) => <option key={j} value={el.fname}>{el.fname}</option>)
                      }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'lname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Επίθετο</label>
                    <select ref={field} className="form-control">
                      {
                        initDataStudents.map((el, m) => <option key={m} value={el.lname}>{el.lname}</option>)
                      }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'payment') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Πληρωμή</label>
                    <select ref={field} className="form-control">
                      {
                          paymentTypes.map((el, n) =>
                            <option key={n} value={el}>{el}</option>)
                       }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'notes') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Σημειώσεις</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="text"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'class') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Τάξη</label>
                    <select ref={field} className="form-control">
                      {
                       initDataStudentClasses.map((el, f) =>
                         <option key={f} value={el}>{el}</option>)
                      }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'dateOfPayment') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Ημερομηνία πληρωμής</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="date"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>{ name }</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={initPayments.length + 1} />
                    { error }
                  </div>);
              }
            })
          }
        </div>
        <div>
          <button
            style={{ marginLeft: '30px' }}
            className="btn btn-danger"
            onClick={onModalClose}>Έξοδος</button>
          <button
            style={{ marginLeft: '15px' }}
            className="btn btn-danger"
            onClick={() => this.handleSaveBtnClick(columns, onSave)}>Αποθήκευση</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(InsertPaymentRegistersModal);
