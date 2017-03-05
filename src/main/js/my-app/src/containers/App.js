import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Dashboard from '../components/Dashboard';
/*import AddUser from '../components/AddUser';
import DeleteUser from '../components/DeleteUser';
import ExportUsers from '../components/ExportUsers';
import ImportUsers from '../components/ImportUsers';
import UpdateUsers from '../components/UpdateUsers';*/
import GetAllStudents from '../components/GetAllStudents';
import StudentClassDashboard from '../components/StudentClassDashboard';
import Container from './Container';
import NotFound from '../components/NotFound';
import Content from '../components/Content';
import Spinner from '../components/Spinner';
import Loading from 'react-loading-spinner';
import '../../node_modules/react-loading-spinner/src/css/index.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/App.css';

class App extends Component {
 
 constructor (props) {
    super(props);


    this.state = {
      ...props,
      customLoading: false,
      customLoadingContent: '',
      defaultLoading: false,
      defaultLoadingContent: ''
    }

  }
  componentWillMount() {
    //debugger;
    this.defaultLoadingHandler();
  }

  defaultLoadingHandler() {
    this.setState({
      defaultLoading: true
    });

    //debugger;
    let l = parent.students.length;

    // setTimeout(() => {
    //   this.setState({
    //     defaultLoading: false,
    //     defaultLoadingContent: 'Content loaded!'
    //   })
    // }, 500);

    var timer = setInterval(() => { 

      //alert("Hello"); 
      let l = this.props.saved_student.length;

      if (l>0) {
        console.log("students received");
      //   debugger;

        clearInterval(timer);
        this.setState({
          defaultLoading: false,
          defaultLoadingContent: 'Content loaded!'
        })
       }

    }, 100);
    
    // setTimeout(() => {
    //   this.setState({
    //     defaultLoading: false,
    //     defaultLoadingContent: 'Content loaded!'
    //   })
    // }, 1000);
  }

  render() {
    //debugger;

    return (
      <div>
        <Loading isLoading={this.state.defaultLoading} loadingClassName='defloading'>  
          <Content loadedContent={this.state.defaultLoadingContent}/>
        </Loading>
      </div>
    )
  }
}


export default connect(state => state, actions)(App);