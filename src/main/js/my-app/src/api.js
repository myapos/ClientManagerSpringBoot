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
		const classes = res._embedded;
		return classes;
	});
export const getStudentClassesById = (id) => fetch(
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
	});
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

