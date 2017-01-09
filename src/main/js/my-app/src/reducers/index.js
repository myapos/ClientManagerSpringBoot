import * as actions from '../actions/';

const reducer = (state = {}, action) => {
	const { type, 
		initDataStudentClasses, initDataStudents, initDataPayeds, initDataRegisters,
		dataFetchedStudentClasses

	} = action;
	//let classes;

	switch (type) {
		case actions.GET_ALL_STUDENTS:
		//debugger;
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
	            dataFetchedStudentClasses:[{}]
	    }
	    case actions.STUDENT_CLASS_DATA_FETCHED:
	   		return {
	   			...state,
	            dataFetchedStudentClasses  
	   	}
	   	// case actions.STUDENT_CLASS_DATA_BY_ID_FETCHED:
	   	// 	return {
	   	// 		...state,
	    //         dataStudentClass  
	   	// }	
		case actions.DATA_INITIALIZATION:
	   		return {
	   			...state,
	            initDataStudentClasses,
	            initDataStudents,
	            initDataPayeds,
	            initDataRegisters  
	   	}
		default:
		     return state;
	 }
};
export default reducer;
