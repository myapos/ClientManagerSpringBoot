const BASE_URL = document.location.origin.match(/3000/)
	? 'http://localhost:8181'
	: document.location.origin;

export const getStudentClasses = () => fetch(
	BASE_URL + '/api/studentClasses',{ 
	   method: 'get', 
	   mode: 'cors',
	   cache: 'default',
	   headers: {
	     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
	     'Content-Type': 'application/json'//,
		  //"Content-Length": content.length.toString(),
		  //"X-Custom-Header": "ProcessThisImmediately"
	   }
	})
   .then (res => res.json())
   .then(res => { 
		console.log("classes from server: ",res);
		const classes = res._embedded.studentClasses;
		return classes;
	});

export const getStudents = () => fetch(
	BASE_URL + '/api/students',{ 
	   method: 'get', 
	   mode: 'cors',
	   cache: 'default',
	   headers: {
	     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
	     'Content-Type': 'application/json'//,
		  //"Content-Length": content.length.toString(),
		  //"X-Custom-Header": "ProcessThisImmediately"
	   }
	})
   .then (res => res.json())
   .then(res => { 
		console.log("students from server: ",res);
		const students = res._embedded.students;
		return students;
	});

export const getRegisters = () => fetch(
	BASE_URL + '/api/registers',{ 
	   method: 'get', 
	   mode: 'cors',
	   cache: 'default',
	   headers: {
	     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
	     'Content-Type': 'application/json'//,
		  //"Content-Length": content.length.toString(),
		  //"X-Custom-Header": "ProcessThisImmediately"
	   }
	})
   .then (res => res.json())
   .then(res => { 
		console.log("registers from server: ",res);
		const registers = res._embedded.registers;
		return registers;
	});

export const getPayeds = () => fetch(
	BASE_URL + '/api/payeds',{ 
	   method: 'get', 
	   mode: 'cors',
	   cache: 'default',
	   headers: {
	     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
	     'Content-Type': 'application/json'//,
		  //"Content-Length": content.length.toString(),
		  //"X-Custom-Header": "ProcessThisImmediately"
	   }
	})
   .then (res => res.json())
   .then(res => { 
		console.log("payeds from server: ",res);
		const payeds = res._embedded.payeds;
		return payeds;
	});
/*export const getStudentClassesById = (id) => fetch(
	BASE_URL + '/api/studentClasses/'+id,{ 
	   method: 'get', 
	   mode: 'cors',
	   cache: 'default',
	   headers: {
	     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
	     'Content-Type': 'application/json'//,
		  //"Content-Length": content.length.toString(),
		  //"X-Custom-Header": "ProcessThisImmediately"
	   }
	})
   .then (res => res.json())
   .then(res => { 
		console.log("classes from server: ",res);
		const classes = res._embedded;
		return classes;
	});*/


// export const getChannels = () => fetch(
// 	BASE_URL + '/?SPOTX_API=1&action=channels&isAjax=1', {
// 	  credentials: 'include'
// 	})
//    .then (res => res.json());


//export const generateReport = ({
// 	startDate,
// 	endDate,
// 	selectedChannel,
// 	selectedType
// }) => fetch(
// 	BASE_URL 
// 	+ '/?SPOTX_API=1&action=report&isAjax=1'
// 	+ '&startDate=' + startDate
// 	+ '&endDate=' + endDate
// 	+ '&selectedChannel=' + selectedChannel
// 	+ '&selectedType=' + selectedType
// 	+ '&currency_code=EUR',
// 	 {
// 	  credentials: 'include'
// 	})
//    .then (res => res.json());

