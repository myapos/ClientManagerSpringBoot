import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import * as constants from '../constants';
import Dashboard from '../components/Dashboard';
import Spinner from '../components/Spinner';
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
    seconds: PropTypes.number,
    timeElapsed: PropTypes.func,
    countingTime: PropTypes.func,
    setTimer: PropTypes.func,
    timePassed: PropTypes.bool,
    timer: PropTypes.number,
  }
  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
  }
  componentWillMount () {
  }
  componentDidMount () {
    const timer = setInterval(this.tick.bind(this), 1000);
    this.props.setTimer(timer);
    // this.setState({timer});
  }
  componentWillUnmount () {
    this.clearInterval(this.props.timer);
  }
  tick () {
    let hasData = false;
    const { seconds, timer } = this.props;
    this.props.countingTime(seconds);
    console.log('seconds:', seconds, ' passed');
    // Get the size of student --> array of obects. In initial state there is an empty object
    hasData = this.props.initDataStudents.length > 0;

    if (!hasData && seconds === constants.maximumTimeToWaitForData) {
      // hide loader if maximum time passed
      this.props.timeElapsed(true);
      console.log('Maximum time passed. Hiding loader.');
      alert('Maximum time passed. There are no data in data base!');
      clearInterval(timer);
    } else if (hasData) {
      console.log('Found data. Clearing interval:');
      clearInterval(timer);

    }
  }

  render () {
    let hasData = false;
    const { seconds, timePassed } = this.props;
    // Get the size of student --> array of obects. In initial state there is an empty object
    hasData = this.props.initDataStudents.length > 0;
    return (
      <div>Time elapsed {seconds} (secs)
        {
          (!hasData && !timePassed)
          ? <Spinner />
          : <Dashboard
            initRegistrations={this.props.initRegistrations}
            initDataStudentClasses={this.props.initDataStudentClasses}
            initDataStudents={this.props.initDataStudents}
            initPayments={this.props.initPayments}
            displayInitialMsg={this.props.displayInitialMsg} />
        }
      </div>
    );
  }
}

export default connect(state => state, actions)(App);
