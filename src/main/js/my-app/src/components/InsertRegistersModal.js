import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class InsertRegistersModal extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    filteredStudentClassesWithLinks: PropTypes.array,
    onModalClose: PropTypes.func,
    onSave: PropTypes.func,
    columns: PropTypes.array,
    validateState: PropTypes.object,
    ignoreEditable: PropTypes.bool,
    addStudent: PropTypes.func,
    availableClasses: PropTypes.array,
    createRegisters: PropTypes.func,
  }
  handleSaveBtnClick () {
    const {
      columns,
      createRegisters,
    } = this.props;
    const newRow = {};
    columns.forEach(column => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    createRegisters(newRow);
    // onSave(newRow);
  }
  render () {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      initDataStudentClasses,
      initRegistrations,
      initDataStudents,
      processedStudentClasses,
    } = this.props;
    //debugger;
    return (
      <div style={{ backgroundColor: '#4c2727' }} className="modal-content">
        <h2 style={{ color: '#fff', marginLeft: '10px' }}>Προσθήκη εγγραφής</h2>
        <div className="container-fluid">
          {
            columns.map(column => {
              const {
                field,
                hiddenOnInsert,
              } = column;

              if (hiddenOnInsert) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              // console.log('log:', column);
              const error = validateState[field] ? (<span className="help-block bg-danger">{ validateState[field] }</span>) : null;
              // debugger;
              if (field === 'index') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>ID</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={initRegistrations.length + 1} />
                    { error }
                  </div>);
              } else if (field === 'fname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Όνομα</label>
                    <select ref={field} className="form-control">
                      {
                      initDataStudents.map((el, i) => <option key={i} value={el.fname}>{el.fname}</option>)
                    }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'lname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Επίθετο</label>
                    <select ref={field} className="form-control">
                      {
                      initDataStudents.map((el, i) => <option key={i} value={el.lname}>{el.lname}</option>)
                    }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'email') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Email</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="email"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'class') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Τάξη</label>
                    <select ref={field} className="form-control">
                      {
                      processedStudentClasses.map((el, i) => {
                        if (el.description !== 'No subclass') {
                          return <option key={i} value={el}>{el}</option>;
                        }
                      })
                    }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'dateOfRegistration') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Ημερομηνία εγγραφής</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="date"
                      defaultValue={''} />
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

export default connect(state => state, actions)(InsertRegistersModal);
