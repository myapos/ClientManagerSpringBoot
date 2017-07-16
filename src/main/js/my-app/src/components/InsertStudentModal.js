import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class InsertStudentModal extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    onModalClose: PropTypes.func,
    onSave: PropTypes.func,
    columns: PropTypes.array,
    validateState: PropTypes.object,
    ignoreEditable: PropTypes.bool,
    addStudent: PropTypes.func,
    availableClasses: PropTypes.array,
    initRegistrations_: PropTypes.array,
    createRegisters: PropTypes.func,
  }
  handleSaveBtnClick = () => {
    const { columns, addStudent, initDataStudents, onModalClose } = this.props;
    const newRow = {};
    columns.forEach((column, i) => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    addStudent(newRow, initDataStudents, onModalClose);
    // onSave(newRow);
  }

  render () {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      initDataStudents,
      addStudent,
    } = this.props;
    return (
      <div style={{ backgroundColor: '#4c2727' }} className="modal-content">
        <h2 style={{ color: '#fff', marginLeft: '10px' }}>Προσθήκη πελάτη</h2>
        <div className="container-fluid">
          {
            columns.map((column, i) => {
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
              // console.log("log:", column);
              const error = validateState[field] ? (<span className="help-block bg-danger">{ validateState[field] }</span>) : null;

              if (field === 'fname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Όνομα</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'lname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Επίθετο</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'dateOfBirth') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Ημερομηνία</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="date"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'phone') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Κινητό</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="number"
                      min="6900000000"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'facebook') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>{ name }</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="email"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'email') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>{ name }</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="email"
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
                      defaultValue={initDataStudents.length + 1} />
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
            onClick={onModalClose}>Έξοδος
          </button>
          <button
            style={{ marginLeft: '15px' }}
            className="btn btn-danger"
            onClick={() => this.handleSaveBtnClick(columns, onSave)}>Αποθήκευση
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(InsertStudentModal);
