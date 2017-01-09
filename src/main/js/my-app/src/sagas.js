import { takeEvery } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';

import * as api from './api';
import * as actions from './actions';

function* getStudentClasses () {

	console.log('getStudentClasses');
	const state = yield select();
	const dataStudentClasses = yield call(api.getStudentClasses, state);


	yield put({
		type: actions.STUDENT_CLASS_DATA_FETCHED,
		dataStudentClasses
	})
}

function* getStudentClassesById (id) {

	console.log('getStudentClasses');
	const state = yield select();
	const dataStudentClass = yield call(api.getStudentClassesById(id), state);


	yield put({
		type: actions.STUDENT_CLASS_DATA_BY_ID_FETCHED,
		dataStudentClass
	})
}

// function* initializeChannels () {
// 	console.log('getChannels');
// 	const channels = yield call(api.getChannels);
	
// 	yield put({
// 		type: actions.CHANNELS,
// 		channels
// 	})
// }

// function* generateReport () {
// 	//debugger;
// 	console.log('generateReport');
// 	const state = yield select();
// 	const data = yield call(api.generateReport, state);
	
// 	console.log(data);
// 	yield put({
// 		type: actions.DATA_FETCHED,
// 		data
// 	})
// }


function* rootSaga () {
	console.log('saga');

	// yield initializeChannels();

	yield takeEvery(actions.STUDENT_CLASS_DASHBOARD, getStudentClasses);
	yield takeEvery(actions.STUDENT_CLASS_BY_ID, getStudentClassesById);
}

export default rootSaga;