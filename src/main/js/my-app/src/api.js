
parent.BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;

export const getStudentClasses = () => fetch(
        parent.BASE_URL + '/api/studentClasses', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("classes from server: ", res);
        const classes = res._embedded.studentClasses;
        return classes;
    });

export const getStudents = () => fetch(
        parent.BASE_URL + '/api/students', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("students from server: ", res);
        const students = res._embedded.students;
        return students;
    });

export const getRegisters = () => fetch(
        parent.BASE_URL + '/api/registers', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("registers from server: ", res);
        const registers = res._embedded.registers;
        return registers;
    });

export const getPayeds = () => fetch(
        parent.BASE_URL + '/api/payeds', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("payeds from server: ", res);
        const payeds = res._embedded.payeds;
        return payeds;
    });

// Create the XHR object.
function createCORSRequest1(method, url, data) {
    let xhr1 = new XMLHttpRequest();
    if ("withCredentials" in xhr1) {
        xhr1.open(method, url);
        xhr1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.contentType = "application/json";
        //xhr1.send(body);
    } else if (typeof XDomainRequest != "undefined") {
        xhr1 = new XDomainRequest();
        xhr1.open(method, url);
        //xhr.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
    } else {
        xhr1 = null;
    }
    return xhr1;
};

export const saveNewClass = (row) => {
    var request1 = createCORSRequest1("post", parent.BASE_URL + "/api/studentClasses");
    if (request1) {
        request1.onload = function() {
            //debugger;
            //do something with request.responseText
            if (request1.status == 201) {
                alert("A new record has been created in database. Page is reloading");
                console.log("responseText:", request1.responseText);
                window.location.reload(true);
            }

        };

        request1.open("post", parent.BASE_URL + "/api/studentClasses");
        request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request1.setRequestHeader("Content-type", "application/json");
        request1.contentType = "application/json";

        /*this has to be fixed* sets subclass*/
        let body = JSON.stringify({
            "description": row.description,
            "studentClass": "http://localhost:8181/api/studentClasses/1"
        });
        request1.send(body);
    }
}

/*deletes selected class from table -- classId parameter is the id in front end table not in the database*/

export const deleteStudentClass = (classId) => {



    console.log("hey from api.deleteStudentClass. Preparing to delete class with id:", classId);
    let rowByClassId = document.querySelectorAll('tr')[classId];
    let description = rowByClassId.childNodes[2].innerHTML;

    const fetch1 = fetch(parent.BASE_URL + "/api/studentClasses/search/findBydescription" +
            "?description=" + description, {
                method: 'get',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => res.json())
        .then(res => {
            //debugger;
            console.log("data from server: ", res);
            //parent.classesPair[parentDesc] = res;
            let ar = res._links.self.href.split("/");
            let s = ar.length;
            let id = ar[s - 1];

            //delete record student class with id

            fetch(parent.BASE_URL + "/api/studentClasses/"+id, {
                method: 'delete',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        	.then(res => { 
        		//debugger;
        		console.log(res);
        		if(res.status == 204){
        			alert("Student class is deleted succesfully");
        			window.location.reload(true);
        		}
        		//res.json()
        	})
        });
}

