import * as actions from '../actions/';

const reducer = (state = {}, action) => {
	const { type, initDataStudentClasses, initDataStudents, initDataPayeds, initDataRegisters,
		dataFetchedStudentClasses, row, classId, rowUpdate, desc, descBefore, selectedTab, namespace,
		studentId } = action;
	//let classes;

	switch (type) {
		case actions.GET_ALL_STUDENTS:
		//debugger;
	       return {
	             ...state,
	             all:state.saved_student,
            	[namespace]: selectedTab
	       }
	    case actions.PAYMENTS_REGISTERS:
		//debugger;
	       return {
	             ...state,
	             all:state.saved_student,
            	[namespace]: selectedTab
	       }
	    case actions.ADD_STUDENT:
	       return {
	            ...state,
	            row
	             // all:state.saved_data.students
	       }
	    case actions.DELETE_STUDENT:
	       return {
	            ...state,
	            studentId
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
	            dataFetchedStudentClasses:[{}],
            	[namespace]: selectedTab
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
	   	case actions.SAVE_NEW_CLASS:
	   	//debugger;
	   		return {
	   			...state,
	            row 
	   	}
	    case actions.DELETE_CLASS:
	   	//debugger;
	   		return {
	   			...state,
	            classId 
	   	}
	   	case actions.UPDATE_CLASS:
	   	//debugger;
	   		return {
	   			...state,
	   			rowUpdate,
	            desc,
	            descBefore
	   	}

	   	case actions.CHANGE_SELECTED_TAB:
        return {
            ...state,
            [namespace]: selectedTab
        };
		default:
		     return state;
	 }
};
export default reducer;
