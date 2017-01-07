import * as actions from '../actions/';

const reducer = (state, action) => {
	const { type/*, advertiserIndex, id, siteIds*/} = action;
	//debugger;
	//let classes;

	switch (type) {
		case actions.GET_ALL_STUDENTS:
	       return {
	             ...state,
	             all:state.saved_data.students
	       }
	    case actions.ADD_STUDENT:
	       return {
	            ...state,
	             // all:state.saved_data.students
	       }
	    case actions.DELETE_STUDENT:
	       return {
	            ...state,
	             // all:state.saved_data.students
	       }
	   	case actions.UPDATE_STUDENT:
	       return {
	            ...state,
	             // all:state.saved_data.students
	       }
	   	case actions.IMPORT_STUDENTS:
	       return {
	            ...state,
	             // all:state.saved_data.students
	       }
	   	case actions.EXPORT_STUDENTS:
	       return {
	            ...state,
	             // all:state.saved_data.students
	       }
	    case actions.STUDENT_CLASS_DASHBOARD:
	    var classes;
	    console.log("hey from student class dashboard");
	    const root = 'http://localhost:8181/api/studentClasses';
		fetch(root, { 
		   method: 'get', 
		   mode: 'cors',
		   cache: 'default',
		   headers: {
		     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
		     'Content-Type': 'application/json'//,
			  //"Content-Length": content.length.toString(),
			  //"X-Custom-Header": "ProcessThisImmediately"
		 }
		 }).then (res => res.json())
		.then(res => { 

			console.log("classes from server: ",res);
			classes = res._embedded;
		});
		debugger;
		return {
	            ...state,
	            //classes:res._embedded   
	    }
		 default:
		     return state;
	 }
};
export default reducer;
