import * as actions from '../actions/';

const reducer = (state = {}, action) => {
	const { type, initDataStudentClasses, initDataStudents, initDataPayeds, initDataRegisters,
		dataFetchedStudentClasses, row, classId, rowUpdate, desc, descBefore, selectedTab, namespace,
		studentId, paymentId, updateMode, registerId, msg, selectedClass, loadingHandlingCommplete, 
		url, parentDesc, obj, classesPair} = action;

	switch (type) {
		case actions.GET_ALL_STUDENTS:
		   //debugger;
		    parent.loadedStudentData=0;
	       return {
	             ...state,
	             all:state.saved_student,
            	[namespace]: selectedTab
	    };
	    case actions.PAYMENTS_REGISTERS:
	       return {
	             ...state,
	             all:state.saved_student,
            	[namespace]: selectedTab
	    };
	    case actions.REGISTERS:
	       return {
	             ...state,
	             all:state.saved_student,
            	[namespace]: selectedTab
	    };
	    case actions.SEND_EMAILS_MANUALLY:
	       return {
	             ...state,
	             all:state.saved_student,
            	[namespace]: selectedTab
	    };
	    case actions.MSG_SUBMITTED:
	       return {
	             ...state,
	             msg,
	             selectedClass
	    };
	    case actions.CREATE_PAYMENTS_REGISTERS:
	       return {
	            ...state,
	            row
	    };
	    case actions.UPDATE_PAYMENTS_REGISTERS:
	       return {
	            ...state,
	   			rowUpdate,
	   			updateMode
	    };
	    case actions.DELETE_PAYMENTS_REGISTERS:
	       return {
	            ...state,
	   			rowUpdate,
	   			paymentId
	    };
	    case actions.ADD_STUDENT:
	       return {
	            ...state,
	            row
	    };
	    case actions.DELETE_STUDENT:
	       return {
	            ...state,
	            studentId
	    };
	   	case actions.UPDATE_STUDENT:
	       return {
	            ...state,
	   			rowUpdate
	    };
	   	case actions.IMPORT_STUDENTS:
	       return {
	            ...state,
	    };
	   	case actions.EXPORT_STUDENTS:
	       return {
	            ...state,
	    };
	    case actions.STUDENT_CLASS_DASHBOARD:
		return {
	            ...state,
	            dataFetchedStudentClasses:[{}],
            	[namespace]: selectedTab
	    };
	    case actions.STUDENT_CLASS_DATA_FETCHED:
	   		return {
	   			...state,
	            dataFetchedStudentClasses  
	   	};	
		case actions.DATA_INITIALIZATION:
	   		return {
	   			...state,
	            initDataStudentClasses,
	            initDataStudents,
	            initDataPayeds,
	            initDataRegisters  
	   	};
	   	case actions.SAVE_NEW_CLASS:
	   		return {
	   			...state,
	            row 
	   	};
	    case actions.DELETE_CLASS:
	   		return {
	   			...state,
	            classId 
	   	};
	   	case actions.UPDATE_CLASS:
	   		return {
	   			...state,
	   			rowUpdate,
	            desc,
	            descBefore
	   	};
	   	case actions.CHANGE_SELECTED_TAB:
        return {
            ...state,
            [namespace]: selectedTab
        };
        case actions.UPDATE_REGISTERS:
	       return {
	            ...state,
	   			rowUpdate
	    };
	    case actions.CREATE_REGISTERS:
	       return {
	            ...state,
	   			rowUpdate
	    };
	    case actions.DELETE_REGISTERS:
	   		return {
	   			...state,
	            registerId 
	   	};
	    case actions.LOADING_HANDLING:
	    //debugger;
	   		return {
	   			...state,
	            loadingHandlingCommplete 
	   	};
	   	case actions.GET_SUBCLASS:
	   	 //debugger;
	   			return {
	   			...state,
	   	        url,
	   	        parentDesc,
	   	        obj 
	   	};
	   	case actions.SAGAS_GET_SUBCLASS:
	   	 //debugger;
	   			return {
	   			...state,
	   	        classesPair
	   		};
		default:
		     return state;
	 }
};
export default reducer;
