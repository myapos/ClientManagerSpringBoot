import { takeEvery } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
//import configureStore from './store/configureStore';
import * as api from './api';
import * as actions from './actions';

function* getDataFromServer () {

	console.log('getDataFromServer');
	let state = yield select();
	const initDataStudentClasses = yield call(api.getStudentClasses, state);
	//state = yield select();
	const initDataStudents = yield call(api.getStudents, state);
	//state = yield select();
	const initDataPayeds = yield call(api.getPayeds, state);
	//state = yield select();
	const initDataRegisters = yield call(api.getRegisters, state);
	//const initStore = configureStore(initialState);
	//debugger;
	yield put({
		type: actions.DATA_INITIALIZATION,
		initDataStudentClasses,
		initDataStudents,
		initDataPayeds,
		initDataRegisters

	})
}

function* getStudentClasses () {

	console.log('getStudentClasses');
	const state = yield select();
	const dataFetchedStudentClasses = yield call(api.getStudentClasses, state);

	//debugger;
	yield put({
		type: actions.STUDENT_CLASS_DATA_FETCHED,
		dataFetchedStudentClasses
	})
}

function* saveNewStudentClass () {

	console.log('saveNewStudentClass');
	const state = yield select();
	const saveNewClass = yield call(api.saveNewClass, state.row);

	//debugger;
	yield put({
		type: actions.SAGAS_SAVE_NEW_CLASS,
		saveNewClass
	})
}

function* deleteStudentClass () {

	console.log('deleteStudentClass');
	const state = yield select();
	const deleteStudentClass = yield call(api.deleteStudentClass, state.classId);

	//debugger;
	yield put({
		type: actions.SAGAS_DELETE_CLASS,
		deleteStudentClass
	})
}

function* updateStudentClass () {
	//debugger;
	console.log('updateStudentClass');
	const state = yield select();
	const desc = yield call(api.updateStudentClass, state.desc, state.descBefore, state.rowUpdate);
	//debugger;
	
	yield put({
		type: actions.SAGAS_UPDATE_CLASS,
		desc
	})
}

function* saveNewStudent () {

	console.log('saveNewStudent');
	const state = yield select();
	const saveNewStudent = yield call(api.saveNewStudent, state.row);

	//debugger;
	yield put({
		type: actions.SAGAS_SAVE_NEW_STUDENT,
		saveNewStudent
	})
}

function* deleteStudent () {

	console.log('deleteStudent');
	const state = yield select();
	const studentId = yield call(api.deleteStudent, state.studentId);

	//debugger;
	yield put({
		type: actions.SAGAS_DELETE_STUDENT,
		studentId
	})
}

function* rootSaga () {
	console.log('saga');

	yield getDataFromServer();
	//debugger;
	yield takeEvery(actions.STUDENT_CLASS_DASHBOARD, getStudentClasses);
	yield takeEvery(actions.SAVE_NEW_CLASS, saveNewStudentClass);
	yield takeEvery(actions.DELETE_CLASS, deleteStudentClass);
	yield takeEvery(actions.UPDATE_CLASS, updateStudentClass);
	yield takeEvery(actions.ADD_STUDENT, saveNewStudent);
	yield takeEvery(actions.DELETE_STUDENT, deleteStudent);
}

export default rootSaga;