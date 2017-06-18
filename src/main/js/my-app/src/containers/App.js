import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Dashboard from '../components/Dashboard';
import '../../../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/App.css';

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    initPayments: PropTypes.array,
    displayInitialMsg: PropTypes.bool,
  }
  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render () {
    // debugger;
    let hasData = false;
    // Get the size of student --> array of obects. In initial state there is an empty object
    hasData = this.props.initDataStudents.length > 0;
    return (
      <div>
        <Dashboard
          initRegistrations={this.props.initRegistrations}
          initDataStudentClasses={this.props.initDataStudentClasses}
          initDataStudents={this.props.initDataStudents}
          initPayments={this.props.initPayments}
          displayInitialMsg={this.props.displayInitialMsg} />
        {
          !hasData
          ? <div className="loader registers" />
          : null
        }
      </div>
    );
  }
}

export default connect(state => state, actions)(App);
