import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
/*import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers';
import GetAllStudents from './GetAllStudents';*/
import ContentStudentClassDashboard from '../components/ContentStudentClassDashboard';
import Spinner from '../components/Spinner';
import Loading from 'react-loading-spinner';
import '../../node_modules/react-loading-spinner/src/css/index.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import '../css/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import $ from "jquery";
import StudentClassesDataTable from './studentClasses/StudentClassesDataTable';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';


class StudentClassDashboard extends Component {

 constructor (props) {
    super(props);


    this.state = {
      ...props,
      customStudentClassDataLoading: false,
      customStudentClassDataLoadingContent: '',
      defaultStudentClassDataLoading: false,
      defaultStudentClassDataLoadingContent: ''
    }

}

componentDidUpdate() {

    debugger;
    if(this.props.selectedTab != "null" 
      && this.props.selectedTab =="tab2" 
      && !this.state.defaultStudentClassDataLoading
      && this.state.defaultStudentClassDataLoadingContent !== "Student Class Content loaded!"){
      //console.log(flag);
      console.log('selected tab2');
      this.defaultStudentClassDataLoadingHandlerUpdate();
    }

    //else this.defaultStudentClassDataLoadingHandler();
}

shouldComponentUpdate(){
  if(this.state.defaultStudentClassDataLoading){  
    return false;
  }
  else {

    return true;
  }
}


componentWillMount() {
    //debugger;
    this.defaultStudentClassDataLoadingHandler();
}

defaultStudentClassDataLoadingHandler() {
  //debugger;
    this.setState({
      defaultStudentClassDataLoading: true
});



let l = parent.students.length;

// if (l>0) {
  
//     this.setState({
//           defaultStudentDataLoading: false,
//           defaultStudentDataLoadingContent: 'Student Content loaded!'
//     })
// }

var timerStudentClass = setInterval(() => { 

let l = this.props.saved_student.length;

if (l>0) {
        //flag = false;
        console.log("student data received");
        clearInterval(timerStudentClass);
        this.setState({
          defaultStudentClassDataLoading: false,
          defaultStudentClassDataLoadingContent: 'Student Class Content loaded!'
        })
        
       }
// else  flag = true;
    }, 100);
}

defaultStudentClassDataLoadingHandlerUpdate() {
  //debugger;
    this.setState({
      defaultStudentClassDataLoading: true
});



let l = parent.students.length;

// if (l>0) {
  
//     this.setState({
//           defaultStudentDataLoading: false,
//           defaultStudentDataLoadingContent: 'Student Content loaded!'
//     })
// }

var timerStudent = setInterval(() => { 

let l = this.props.saved_student.length;

if (l>0) {
        //flag = false;
        console.log("student data received");
        clearInterval(timerStudent);
        this.setState({
          defaultStudentClassDataLoading: false,
          defaultStudentClassDataLoadingContent: 'Updated Student Class Content loaded!'
        })
        this.forceUpdate();
       }
// else  flag = true;
    }, 100);
}

    handleChange(event, myprops) {
        // do something with event.target.checked
        console.log("hey from handlechange ", event);
        if (event.data) {
            event.toggleState(event);
        }
        //console.log("changed state succesfully");
    };

  cancelFunction(){
    //console.log("hey form cancel function");
    //redirect to main dashboard page
    window.parent.location.href= "/";
  }

  render () {
   return (
      <div>
        <Loading isLoading={this.state.defaultStudentClassDataLoading} loadingClassName='defloading'>  
          <ContentStudentClassDashboard loadedStudentClassContent={this.state.defaultStudentClassDataLoadingContent}/>
        </Loading>
      </div>
    )
  }
}

export default connect(state => state, actions)(StudentClassDashboard);
