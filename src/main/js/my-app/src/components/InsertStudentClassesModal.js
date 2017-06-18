import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class InsertStudentClassesModal extends React.Component {

  handleSaveBtnClick = () => {
    const { columns, onSave, saveNewClass } = this.props;
    const newRow = {};
    columns.forEach((column, i) => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    saveNewClass(newRow);
    // onSave(newRow);
  }

  render () {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      addStudent,
    } = this.props;
    return (
      <div style={{ backgroundColor: '#4c2727' }} className="modal-content">
        <h2 style={{ color: '#fff', marginLeft: '10px' }}>Προσθήκη Τάξης</h2>
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
              console.log('log:', column);
              const error = validateState[field] ? (<span className="help-block bg-danger">{ validateState[field] }</span>) : null;
              if (field === 'index') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>ID</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={parent.studentClasses.length + 1} />
                    { error }
                  </div>);
              } else if (field === 'description') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Τάξη</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'subClassDescription') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Υποτμήμα</label>

                    <select ref={field} className="form-control">
                      <option value="No subclass">No subclass</option>
                      {
                         parent.studentClasses.map((el, j) =>
                           <option key={j} value={el.description}>{el.description}</option>
                         )
                       }
                    </select>
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

export default connect(state => state, actions)(InsertStudentClassesModal);
