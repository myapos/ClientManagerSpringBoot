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

// Create the XHR object.
function createCORSRequest1(method, url, data){
    let xhr1 = new XMLHttpRequest();
    debugger;
 //    body={
	// 	 		"description": "KVMG",
	// 	        "studentClass": data		
	// };
    if ("withCredentials" in xhr1){
        xhr1.open(method, url);
        xhr1.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
        xhr1.setRequestHeader("Content-type","application/json");
        xhr1.contentType = "application/json";
        //xhr1.send(body);
    } else if (typeof XDomainRequest != "undefined"){
        xhr1 = new XDomainRequest();
        xhr1.open(method, url);
        //xhr.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
    } else {
        xhr1 = null;
    }
    return xhr1;
};

export const saveNewClass = (row) => {
		 var request1 = createCORSRequest1("post", "http://localhost:8181/api/studentClasses");

		if (request1){
		    request1.onload = function(){
		        //do something with request.responseText
		        console.log("sssssss:",request1.responseText);
		        //parent.students = JSON.parse(request.responseText);
		        //debugger;

		    };

		    request1.open("post", "http://localhost:8181/api/studentClasses");
		    request1.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
		    request1.setRequestHeader("Content-type","application/json");
        	request1.contentType = "application/json";
        	debugger;
        	//let obj = JSON.parse(request2.responseText);
        	//obj.id=1;
        	let body= JSON.stringify({
		 		"description": row.row.description,
		        "studentClass": "http://localhost:8181/api/studentClasses/1"		
			});
		    request1.send(body);
		}
 //   .then (res => res.json())
 //   .then(res => { 


 //   	debugger;
	// 	console.log("-----api--------studentClasses from server: ",res);
	// 	console.log("saving row",row.row);
	// 	//const studentClasses = res._embedded.studentClasses;
	// 	//return studentClasses;
	// });

}


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

