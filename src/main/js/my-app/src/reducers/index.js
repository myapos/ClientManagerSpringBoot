import * as actions from '../actions/';

const reducer = (state = {}, action) => {
	const { type, dataStudentClasses, dataStudentClass} = action;
	//let classes;

	switch (type) {
		case actions.GET_ALL_STUDENTS:
	       return {
	             ...state,
	             all:state.saved_student
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
		return {
	            ...state,
	            dataStudentClasses:[{}]
	    }
	    case actions.STUDENT_CLASS_DATA_FETCHED:
	   		return {
	   			...state,
	            dataStudentClasses  
	   		}
	   	case actions.STUDENT_CLASS_DATA_BY_ID_FETCHED:
	   		return {
	   			...state,
	            dataStudentClass  
	   	}	
		
		default:
		     return state;
	 }
};
export default reducer;
