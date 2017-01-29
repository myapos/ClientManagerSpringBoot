
parent.BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
parent.request1 = {};
parent.rowDescription = {};
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
    //debugger;
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
        //find subclass by row.subClassdescription
        const fetch2 = fetch(parent.BASE_URL + "/api/studentClasses/search/findBydescription" +
            "?description=" + row.subClassDescription, {
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
            console.log("data from server studentclass with select: ", res);
            let body = JSON.stringify({
                "description": parent.rowDescription,
                "studentClass": res._links.studentClass[0].href
            });//res._links.studentClass[0].href
            parent.request1.send(body);
        });

        // let body = JSON.stringify({
        //     "description": row.description,
        //     "studentClass": "http://localhost:8181/api/studentClasses/1"
        // });
        parent.rowDescription = row.description;
        parent.request1 = request1;
    }
}

/*deletes selected class from table -- classId parameter is the id in front end table not in the database*/

export const deleteStudentClass = (classId) => {


    //debugger;
    console.log("hey from api.deleteStudentClass. Preparing to delete class with id:", classId);
    let x = document.getElementById("studentClasses");
    let rowByClassId = x.querySelectorAll('tr')[classId];
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
                else{
                    alert("The class you are trying to delete is subclass to another class. Please try to delete the parent class first");
                }
        		//res.json()
        	})
        });
}

/*update selected class from table -- desc parameter is the description in front end table not in the database*/

export const updateStudentClass = (newdesc, descBefore, rowUpdate) => {
    //debugger;
    console.log("hey from api.updateStudentClass. Preparing to update class",rowUpdate," with new desc:", newdesc);

    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74



    // let rowByClassId = document.querySelectorAll('tr')[classId];
    // let description = rowByClassId.childNodes[2].innerHTML;
    let bodyData = JSON.stringify({
        "description": newdesc,
        "studentClass": rowUpdate._links.self.href
    });
    //debugger;
    const fetch1 = fetch(rowUpdate._links.self.href , {
                method: 'PATCH',
                mode: 'cors',
                cache: 'default',
                body: bodyData,
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => {
            if(res.status == 200){

            //debugger;
            alert("Class is updated succsesfully. Prepare for reloading");
            window.location.reload(true);
    //         // }
        }
            //res.json()

        })

    // let request1 = createCORSRequest1("patch", rowUpdate._links.self.href);
    // if (request1) {
    //     request1.onload = function() {
    //         //debugger;
    //         //do something with request.responseText
    //         // if (request1.status == 201) {
    //         //     alert("A new record has been created in database. Page is reloading");
    //         //     console.log("responseText:", request1.responseText);
    //         //     window.location.reload(true);
    //         // }

    //     };

    //     request1.open("PATCH", rowUpdate._links.self.href);
    //     request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    //     request1.setRequestHeader("Content-type", "application/json");
    //     request1.contentType = "application/json";
    //     request1.send(bodyData);
    // }
        // .then(res => {
        //     //debugger;
        //     console.log("update data from server: ", res);
        // })
    //         //parent.classesPair[parentDesc] = res;
    //         let ar = res._links.self.href.split("/");
    //         let s = ar.length;
    //         let id = ar[s - 1];

    //         //delete record student class with id

    //         fetch(parent.BASE_URL + "/api/studentClasses/"+id, {
    //             method: 'delete',
    //             mode: 'cors',
    //             cache: 'default',
    //             headers: {
    //                 'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(res => { 
    //             //debugger;
    //             console.log(res);
    //             if(res.status == 204){
    //                 alert("Student class is deleted succesfully");
    //                 window.location.reload(true);
    //             }
    //             //res.json()
    //         })
    //     });
}



export const saveNewStudent = (row) => {

   
    //send data to database --rest api call
    //save new student curl

    //curl -v -u myapos:Apostolakis1981 -i -X POST -H "Content-Type:application/json" -d '{"fname" : "testcurlfname","lname" : "testcurllname","fname" : "testcurl", "dateOfBirth":"2013-04-02T08:35:42.000+0000", "email" : "testcurlemail","phone" : "testcurlphone","facebook" : "testcurlfacebook","manager":"http://localhost:8181/api/managers/17"}' http://localhost:8181/api/students
    //http://localhost:8181/api/students?fname=testcurlfname
    //&lname=testcurllname& ...............&dateOfPayment=2013-04-02T08:35:42.000+0000&.........
    //&manager=http://localhost:8181/api/managers/17

    // dateOfBirth:"fds"
    // email:"fds"
    // facebook:"fds"
    // fname:"ddf"
    // index:"5"
    // lname:"fd"
    // phone:"fds"
    //let date = new Date(row.dateOfBirth);




    //debugger;
    //check email type

    let str = row.email;
    let n = str.includes("@");
    //debugger;

    if(n) {
        let date = new Date(row.dateOfBirth);

        let bodyData = JSON.stringify({
            "fname": row.fname,
            "lname": row.lname,
            "email": row.email,
            "dateOfBirth": date,
            "facebook": row.facebook,
            "phone": row.phone,
            "manager": "http://localhost:8181/api/managers/17",
        });

        const fetch1 = fetch(parent.BASE_URL + "/api/students" , {
                    method: 'post',
                    mode: 'cors',
                    cache: 'default',
                    body: bodyData,
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
                })
            .then(res => {
                //debugger;
                if(res.status == 201){

                //debugger;
                alert("New student saved succsesfully. Prepare for reloading");
                window.location.reload(true);
                }
                else {
                    alert("something bad happened.Please check your input data.");    
                }
                //res.json()

        })
    } 
    else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com");   
    }

}


/*deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export const deleteStudent = (studentId) => {


    //debugger;
    console.log("hey from api.deleteStudentClass. Preparing to delete student with id:", studentId);
    let x = document.getElementById("students");
    let rowByClassId = x.querySelectorAll('tr')[studentId];
    let fname = rowByClassId.childNodes[2].innerHTML;

    const fetch1 = fetch(parent.BASE_URL + "/api/students/search/findByFname" +
            "?fname=" + fname, {
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
            try{
            
            //parent.classesPair[parentDesc] = res;
            let ar = res._links.self.href.split("/");
            let s = ar.length;
            let id = ar[s - 1];
            //delete record student class with id

            fetch(parent.BASE_URL + "/api/students/"+id, {
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
                console.log(res.status);
                if(res.status == 204){
                    alert("Student is deleted succesfully.Prepare to reload");
                    window.location.reload(true);
                }
                else if(res.status == 500){
                    alert("Something bad happened.Are there two users with the same name?");
                }
                else {
                    alert("Something bad happened. Please try again");
                }
                //res.json()
            })
            }
            catch (e){
                alert("Something bad happened. Error: "+e.message+". Please try again");
                window.location.reload(true);
            }

        });
}


export const updateStudent = (/*newdesc, descBefore, */rowUpdate) => {

    //console.log("hey from api.updateStudent. Preparing to update student",rowUpdate," with new desc:", newdesc);
    console.log("hey from api.updateStudent. Preparing to update student",rowUpdate);

    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/students/74


    //debugger;
    // let rowByClassId = document.querySelectorAll('tr')[classId];
    // let description = rowByClassId.childNodes[2].innerHTML;
    let str = rowUpdate.email;
    let n = str.includes("@");
    //debugger;

    if(n) {
    let date = new Date(rowUpdate.dateOfBirth);
    let bodyData = JSON.stringify({
            "fname": rowUpdate.fname,
            "lname": rowUpdate.lname,
            "email": rowUpdate.email,
            "dateOfBirth": date,
            "facebook": rowUpdate.facebook,
            "phone": rowUpdate.phone,
            "manager": "http://localhost:8181/api/managers/17",
        });
    const fetch1 = fetch(rowUpdate._links.self.href , {
                method: 'PATCH',
                mode: 'cors',
                cache: 'default',
                body: bodyData,
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => {
            //debugger;
            if(res.status == 200){

            //debugger;
            alert("Class is updated succsesfully. Prepare for reloading");
            window.location.reload(true);
        }

        })
    } else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com"); 
         window.location.reload(true);  
    }
}


export const addPaymentRegisters = (row) => {
//debugger;



}

export const updatePaymentRegisters = (updateMode , row) => {
//debugger;

if (updateMode == "paymentUpdate" || updateMode == "paymentNotesUpdate" ||
    updateMode == "updateDateOfPayment"){
    
    //curl -v -u myapos:Apostolakis1981 -i -X POST -H "Content-Type:application/json" -d 
    //'{ "payment" : "true", "dateOfPayment":"2013-04-02T08:35:42.000+0000", "notes":"dummy_notes", 
    //"register":"http://localhost:8181/api/registers/2"}' http://localhost:8181/api/payeds

    //debugger;

    //sync requests

    //step 1 find student by student fname and lname

    //http://localhost:8181/api/students/search/findByFnameAndLname?fname=myros&lname=myroslname
    let url = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

            let resObj = JSON.parse(request.responseText);
            console.log("sync call 1:", resObj);
            let student = resObj._links.self.href;

            // let ar = url2.split("/");
            // let s = ar.length;
            // let id = ar[s - 1];
            // let student = parent.BASE_URL+"/api/students/"18

            //step 2 find register by student

            let url2 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+student;
            let request2 = new XMLHttpRequest();
            request2.open('GET', url2, false);  // `false` makes the request synchronous
            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request2.setRequestHeader("Content-type", "application/json");
            request2.contentType = "application/json"
            request2.send(null);

            if (request2.status === 200) {

                let resObj2 = JSON.parse(request2.responseText);
                console.log("sync call 2:", resObj2);
                let register = resObj2._links.self.href;


                //step 3 update payments

                //step 3.1 find payment id to update

                let ar = register.split("/");
                let s = ar.length;
                let registerId = ar[s - 1];

                let url3 = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+register;
                let request3 = new XMLHttpRequest();
                request3.open('GET', url3, false);  // `false` makes the request synchronous
                request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                request3.setRequestHeader("Content-type", "application/json");
                request3.contentType = "application/json"
                request3.send(null);

                if (request3.status === 200) {
                    
                    let resObj3 = JSON.parse(request3.responseText);
                    console.log("sync call 3:", resObj3);
                    //let payment3 = resObj3._links.self.href;
                    let payment = resObj3._embedded.payeds[0]._links.payed.href;
                    //debugger;

                    //step 3.2 update payments
                    let date = new Date(row.dateOfPayment);
                    let bodyData = JSON.stringify({
                            "payment" : row.payment,
                            "dateOfPayment": date,
                            "notes": row.notes,
                            "register": register
                        });

                    let request4 = new XMLHttpRequest();
                    request4.open('PATCH', payment, false);  // `false` makes the request synchronous
                    request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request4.setRequestHeader("Content-type", "application/json");
                    request4.contentType = "application/json"
                    request4.send(bodyData);

                    if (request4.status === 200) {

                        let resObj4 = JSON.parse(request4.responseText);

                        console.log("sync call 4:", resObj4);
                        //debugger;
                        alert("Payment has been updated in database. Page is reloading");
                        window.location.reload(true);

                    }
                    else {

                        alert("Something bad has happened. Please try again");

                    }


                }



                //DOULEUEI GIA TO UPDATE
                
                // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d 
                // '{ "payment" : "true", "dateOfPayment":"2013-04-02T08:35:42.000+0000", "notes":"dummy_notes",
                //"register":register }' http://localhost:8181/api/payeds


                //curl -v -u myapos:Apostolakis1981 -i -X POST -H "Content-Type:application/json" -d 
                //'{ "payment" : "true", "dateOfPayment":"2013-04-02T08:35:42.000+0000", "notes":"dummy_notes", 
                //"register":"http://localhost:8181/api/registers/2"}' http://localhost:8181/api/payeds

                //let date = new Date(row.dateOfPayment);
            }
    }

} 
// else if (updateMode == "paymentNotesUpdate"){
    
//     debugger;
    
// } 
else if (updateMode == "classUpdate"){

    
    //debugger;
    
    //DOULEUEI GIA TO UPDATE
    // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d 
    // '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' 
    //http://localhost:8181/api/studentClasses/74



} 
// else if (updateMode == "updateDateOfPayment"){

    
//     debugger;
   

// } 

}

export const deletePaymentRegisters = (row) => {
//debugger;



}
