parent.BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
parent.request1 = {};
parent.rowDescription = {};
export const getStudentClasses = () => {
    //debugger;
   // parent.loadedStudentClasses = 0;
    fetch(
        parent.BASE_URL + '/api/studentClasses', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
            }
        })
    .then(res => res.json())
    .then(res => {
        //console.log("classes from server: ", res);
        const classes = res._embedded.studentClasses;
        //parent.loadedStudentClasses = 1;
        return classes;
        
    });
}

export const getStudents = () => {
    //debugger;
    parent.loadedStudents = 0; 
    fetch(
        parent.BASE_URL + '/api/students', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
            }
        })
    .then(res => res.json())
    .then(res => {
        //console.log("students from server: ", res);
        const students = res._embedded.students;
        parent.loadedStudents = 1;
        return students;
    });
}
export const getRegisters = () => {
    //debugger;
    fetch(
        parent.BASE_URL + '/api/registers', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' 
        }})
    .then(res => res.json())
    .then(res => {
        //console.log("registers from server: ", res);
        const registers = res._embedded.registers;
        return registers;
    });
}

export const getPayeds = () => {
    //debugger;
    fetch(
        parent.BASE_URL + '/api/payeds', {
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
        //console.log("payeds from server: ", res);
        const payeds = res._embedded.payeds;

        return payeds;
    });
}

// Create the XHR object.
function createCORSRequest1(method, url, data) {
    let xhr1 = new XMLHttpRequest();
    if ("withCredentials" in xhr1) {
        xhr1.open(method, url);
        xhr1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.contentType = "application/json";
    } else if (typeof XDomainRequest !== "undefined") {
        xhr1 = new XDomainRequest();
        xhr1.open(method, url);
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
            if (request1.status === 201) {
                alert("A new record has been created in database. Page is reloading");
                //console.log("responseText:", request1.responseText);
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

            //console.log("data from server studentclass with select: ", res);
            let body = JSON.stringify({
                "description": parent.rowDescription,
                "studentClass": res._links.studentClass[0].href
            });
            parent.request1.send(body);
        });


        parent.rowDescription = row.description;
        parent.request1 = request1;
    }
}

/*deletes selected class from table -- classId parameter is the id in front end table not in the database*/

export const deleteStudentClass = (classId) => {
    //debugger;
    //console.log("hey from api.deleteStudentClass. Preparing to delete class with id:", classId);
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

            //console.log("data from server: ", res);
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

        		//console.log(res);
        		if(res.status === 204){
        			alert("Student class is deleted succesfully");
        			window.location.reload(true);
        		}
                else{
                    alert("The class you are trying to delete is subclass to another class. Please try to delete the parent class first");
                }
        	})
        });
}

/*update selected class from table -- desc parameter is the description in front end table not in the database*/

export const updateStudentClass = (newdesc, descBefore, rowUpdate) => {
    //debugger;
    //console.log("hey from api.updateStudentClass. Preparing to update class",rowUpdate," with new desc:", newdesc);

    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74

    let bodyData = JSON.stringify({
        "description": newdesc,
        "studentClass": rowUpdate._links.self.href
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
            if(res.status === 200){

            alert("Class is updated succsesfully. Prepare for reloading");
            //window.location.reload(true);

        }

        })

}


export const saveNewStudent = (row) => {
    //debugger;
    //check email type

    let str = row.email;
    let n = str.includes("@");

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
                if(res.status === 201){

                alert("New student saved succsesfully. Prepare for reloading");
                //window.location.reload(true);
                }
                else {
                    alert("something bad happened.Please check your input data.");    
                }

        })
    } 
    else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com");   
    }

}


/*deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export const deleteStudent = (studentId) => {
    //debugger;
    //console.log("hey from api.deleteStudentClass. Preparing to delete student with id:", studentId);
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
            //console.log("data from server: ", res);
            try{
            
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
                //console.log(res.status);
                if(res.status === 204){
                    alert("Student is deleted succesfully.Prepare to reload");
                    window.location.reload(true);
                }
                else if(res.status === 500){
                    alert("Something bad happened.Are there two users with the same name?");
                }
                else {
                    alert("Something bad happened. Please try again");
                }
            })
            }
            catch (e){
                alert("Something bad happened. Error: "+e.message+". Please try again");
                window.location.reload(true);
            }

        });
}


export const updateStudent = (rowUpdate) => {
    //debugger;
    //console.log("hey from api.updateStudent. Preparing to update student",rowUpdate);

    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/students/74

    let str = rowUpdate.email;
    let n = str.includes("@");

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
            if(res.status === 200){
            alert("Student is updated succsesfully. Prepare for reloading");
            //window.location.reload(true);
        }

        })
    } else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com"); 
         window.location.reload(true);  
    }
}


export const addPaymentRegisters = (row) => {

}

export const updatePaymentRegisters = (updateMode , row) => {
//debugger;
if (updateMode === "paymentUpdate" || updateMode === "paymentNotesUpdate" ||
    updateMode === "updateDateOfPayment"){

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
            //console.log("sync call 1:", resObj);
            let student = resObj._links.self.href;

            //step 2 find student class by description row.class "http://localhost:8181/api/studentClasses/search/findBydescription{?description}",

            let url2St = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
            let request2St = new XMLHttpRequest();
            request2St.open('GET', url2St, false);  // `false` makes the request synchronous
            request2St.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request2St.setRequestHeader("Content-type", "application/json");
            request2St.contentType = "application/json"
            request2St.send(null);

            if (request2St.status === 200) {   
                let resObj2St = JSON.parse(request2St.responseText);
                //console.log("sync call 2St:", resObj2St);

                    //step 2.1 find register by student class

                    let url21 = parent.BASE_URL+"/api/registers/search/findByStudentAndStudentClass?student="
                        +student+"&studentClass="+resObj2St._links.self.href;

                    let request21 = new XMLHttpRequest();
                    request21.open('GET', url21, false);  // `false` makes the request synchronous
                    request21.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request21.setRequestHeader("Content-type", "application/json");
                    request21.contentType = "application/json"
                    request21.send(null);

                    if (request21.status === 200) {

                        let resObj21 = JSON.parse(request21.responseText);
                        //console.log("sync call 2:", resObj21);

                       /* for(let x=0; x<resObj21._embedded.registers.length; x++){*/    //for 1
                        {
                        //has to be fixed for many
                        let register = resObj21._links.self.href; //has to be fixed for many
                        //update only the selected payment 


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
                            //console.log("sync call 3:", resObj3);

                            //ean den iparxei plirwmi tote dimiourgise ti alliws kane update

                            if (resObj3._embedded.payeds.length ==0) {
                                //console.log("no payments were found. So create one!!");
                                //let payment = resObj3._embedded.payeds[s]._links.payed.href; //has to be fixed for many
                                let payment = parent.BASE_URL+"/api/payeds/";
                                ////debugger;

                                //step 3.2 update payments
                                let date = new Date(row.dateOfPayment.substr(0, 10));

                                let bodyData = JSON.stringify({
                                        "payment" : row.payment,
                                        "dateOfPayment": date,
                                        "notes": row.notes,
                                        "register": register
                                });

                                let request5 = new XMLHttpRequest();
                                request5.open('POST', payment, false);  // `false` makes the request synchronous
                                request5.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                request5.setRequestHeader("Content-type", "application/json");
                                request5.contentType = "application/json"
                                request5.send(bodyData);

                                if (request5.status === 201) {

                                    let resObj5 = JSON.parse(request5.responseText);

                                    //console.log("sync call 5:", resObj5);


                                        alert("Payment has been updated in database. Page is reloading");


                                }
                                else {

                                    alert("Something bad has happened. Please try again");

                                }
                            }
                            else {
                                for(let s=0; s<resObj3._embedded.payeds.length; s++){ // for 2
                                let payment = resObj3._embedded.payeds[s]._links.payed.href; //has to be fixed for many


                                //step 3.2 update payments
                                let date = new Date(row.dateOfPayment.substr(0, 10));

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

                                    //console.log("sync call 4:", resObj4);

                                     if (s === resObj3._embedded.payeds.length -1){
                                        alert("Payment has been updated in database. Page is reloading");
 
                                    }


                                }
                                else {

                                    alert("Something bad has happened. Please try again");

                                }
                            }//end of for 2
                        } //end of else
                        }

                    }
            } //end of for 1
            }     

    }

} 

else if (updateMode === "classUpdate"){

    //sync calls
    //prepei na kanw update tin eggrafi register ara na allaksw to class id mesa ston pinaka register

    //step 1 find student by fname and lname

    let url = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

            let resObj = JSON.parse(request.responseText);
            //console.log("sync call 1:", resObj);
            let student = resObj._links.self.href;


            //step2 find register id by student 
            let url2 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+student;

            let request2 = new XMLHttpRequest();
            request2.open('GET', url2, false);  // `false` makes the request synchronous
            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request2.setRequestHeader("Content-type", "application/json");
            request2.contentType = "application/json"
            request2.send(null);

            if (request2.status === 200) {

                let resObj2 = JSON.parse(request2.responseText);
                //console.log("sync call 2:", resObj2);


            //step 3 find classes by description
            let url3 = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
            let request3 = new XMLHttpRequest();
            request3.open('GET', url3, false);  // `false` makes the request synchronous
            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request3.setRequestHeader("Content-type", "application/json");
            request3.contentType = "application/json"
            request3.send(null);

            if (request3.status === 200) {

                let resObj3 = JSON.parse(request3.responseText);
                //console.log("sync call 3:", resObj3); 

                //step 4 make the patch request
                let date = new Date(row.dateOfPayment.substr(0, 10));
                let bodyData = JSON.stringify({
                            "dateOfRegistration" : date,
                            "student": student,
                            "studentClass": resObj3._links.self.href
                    });

                    let request4 = new XMLHttpRequest();
                    let registrations = resObj2._embedded.registers;
                    for (let j=0; j<registrations.length;j++) {
                    let url4 = resObj2._embedded.registers[j]._links.register.href;
                    //debugger;
                    request4.open('PATCH', url4, false);  // `false` makes the request synchronous
                    request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request4.setRequestHeader("Content-type", "application/json");
                    request4.contentType = "application/json"
                    request4.send(bodyData);

                    if (request4.status === 200) {

                        let resObj4 = JSON.parse(request4.responseText);

                        //console.log("sync call 4:", resObj4);

                        if (j === registrations.length -1){
                            alert("Payment has been updated in database. Page is reloading");
                            window.location.reload(true);
                        }

                    }
                    else {

                        alert("Something bad has happened. Please try again");

                    }

                }

            }


            
            }

    }



} 


}

export const deletePaymentRegisters = (id) => {
    //debugger;
    //console.log("hey from api.deletePaymentRegisters. Preparing to delete payment with id:", id);
    let x = document.getElementById("PaymentRegisters");
    let rowByClassId = x.querySelectorAll('tr')[id];
    let description = rowByClassId.childNodes[2].innerHTML;
    let notes = rowByClassId.childNodes[5].innerHTML;
    let subClassDescription = rowByClassId.childNodes[6].innerHTML;
    parent.paymentDate = rowByClassId.childNodes[7].innerHTML;
  
    //steps for deletion
    // i need registration id

    //delete payment only if there is one payment.
    if(notes !== "No payment yet") { 

        
        // step 1 find class id by description

         const fetch1 = fetch(parent.BASE_URL + "/api/studentClasses/search/findBydescription" +
            "?description=" + subClassDescription, {
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

            //console.log("data from server: ", res);

            // step 2 find registration id by class

            //http://localhost:8181/api/registers/search/findByStudentClass?studentClass=http://localhost:8181/api/studentClasses/1

            const fetch2 = fetch(parent.BASE_URL + "/api/registers/search/findByStudentClass" +
                "?studentClass=" + res._links.self.href, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
                })
            .then(res2 => res2.json())
            .then(res2 => {
                
                //console.log("data from server2: ", res2);


                //for all registers get registration id's

                let url =""; //initialization

                for(let jj=0; jj< res2._embedded.registers.length; jj++){


                    //find payment by registration
                    url = res2._embedded.registers[jj]._links.self.href;


                    const fetch3 = fetch(parent.BASE_URL + "/api/payeds/search/findByRegister" +
                    "?register=" + url, {
                        method: 'get',
                        mode: 'cors',
                        cache: 'default',
                        headers: {
                            'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res3 => res3.json())
                    .then(res3 => {

                         //console.log("data from server: ", res3);
                         // step 3 find payments by registration id

                         if(res3._embedded.payeds.length>0){
                            //console.log("found payments:"+res3._embedded.payeds.length);

                            //console.log("preparing to delete payments");
                            //step 4  delete payment which is found
                            for(let vv=0; vv< res3._embedded.payeds.length; vv++){


                                let paymentUrl = res3._embedded.payeds[vv]._links.self.href;;
                                //console.log("paymentUrl:"+paymentUrl);

                                const fetch4 = fetch(paymentUrl, {
                                    method: 'delete',
                                    mode: 'cors',
                                    cache: 'default',
                                    headers: {
                                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(res4 => {

                                    //console.log("data from server: ", res4);

                                     if (res4.status === 204) {
                                        alert("deleted payment succesfully. Page is reloading");
                                        window.location.reload(true);
                                     }
                                     else {
                                        alert("Something bad happened");

                                     }

                               })
                             }




                         }
                         


                    })



                }



            })


        })



    } 
    else {

        alert("Payment is not set yet!");
    }

}



export const createRegisters = (row) => {
    //debugger;
//create call -- we need student id, studentClass id, dateOfRegistration


//find studentClass id

//http://localhost:8181/api/studentClasses/search/findBydescription?description=row.class


    let url = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

        let resObj = JSON.parse(request.responseText);
        //console.log("sync call 1:", resObj);

        let classLink = resObj._links.self.href; //has to be fixed for many


        let url2 = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
        let request2 = new XMLHttpRequest();
        request2.open('GET', url2, false);  // `false` makes the request synchronous
        request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request2.setRequestHeader("Content-type", "application/json");
        request2.contentType = "application/json"
        request2.send(null);

        if (request2.status === 200) {

            //step 2 find student id to update
            let resObj2 = JSON.parse(request2.responseText);
            //console.log("sync call 2:", resObj2);

            let studentLink = resObj2._links.self.href; //has to be fixed for many

            //new registration call


            let date = new Date(row.dateOfRegistration.substr(0, 10));

            let bodyData = JSON.stringify({
                    "studentClass" : classLink,
                    "dateOfRegistration": date,
                    "student": studentLink
            });

            let url3 = parent.BASE_URL+"/api/registers/";
            let request3 = new XMLHttpRequest();
            request3.open('POST', url3, false);  // `false` makes the request synchronous
            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request3.setRequestHeader("Content-type", "application/json");
            request3.contentType = "application/json"
            request3.send(bodyData);
            
            if (request3.status === 201) {

                let resObj3 = JSON.parse(request2.responseText);
                //console.log("sync call 3:", resObj3);
                alert("Registration has been created in database. Page is reloading");
                window.location.reload(true);

            } else {
                
                alert("Something bad has happened. Please try again");

            }

        }


    }

}


export const updateRegisters = (row) => {

    //debugger;
//create call -- we need student id, studentClass id, dateOfRegistration


//find studentClass id

//http://localhost:8181/api/studentClasses/search/findBydescription?description=row.class


    let url = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

        let resObj = JSON.parse(request.responseText);
        //console.log("sync call 1:", resObj);

        let classLink = resObj._links.self.href; //has to be fixed for many????

        let url2 = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
        let request2 = new XMLHttpRequest();
        request2.open('GET', url2, false);  // `false` makes the request synchronous
        request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request2.setRequestHeader("Content-type", "application/json");
        request2.contentType = "application/json"
        request2.send(null);

        if (request2.status === 200) {
            
            //step 2 find student id to update
            let resObj2 = JSON.parse(request2.responseText);
            //console.log("sync call 2:", resObj2);

            let studentLink = resObj2._links.self.href; //has to be fixed for many

            //new registration call

            let url3 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+studentLink;
            let request3 = new XMLHttpRequest();
            request3.open('GET', url3, false);  // `false` makes the request synchronous
            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request3.setRequestHeader("Content-type", "application/json");
            request3.contentType = "application/json"
            request3.send(null);

            if (request3.status === 200) {
                
                let resObj3 = JSON.parse(request3.responseText);
                //console.log("sync call 3:", resObj3);

                let date = new Date(row.dateOfRegistration.substr(0, 10));

                let bodyData = JSON.stringify({
                        "studentClass" : classLink,
                        "dateOfRegistration": date,
                        "student": studentLink
                });

                //update registration for student
                let url4 = resObj3._embedded.registers[0]._links.self.href;
                let request4 = new XMLHttpRequest();
                request4.open('PATCH', url4, false);  // `false` makes the request synchronous
                request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                request4.setRequestHeader("Content-type", "application/json");
                request4.contentType = "application/json"
                request4.send(bodyData);

                if (request4.status === 200) {
                    
                    let resObj4 = JSON.parse(request4.responseText);
                    //console.log("sync call 4:", resObj4);
                    alert("Registration has been updated in database. Page is reloading");
                    window.location.reload(true);

                } else {
                
                    alert("Something bad has happened. Please try again");

                }   

            }

        }


    }

}


export const deleteRegisters = (registerId) => {
    //debugger;
    //console.log("hey from api.deleteRegisters. Preparing to delete register with id:", registerId);
    let x = document.getElementById("registers");
    let rowByClassId = x.querySelectorAll('tr')[registerId];
    let fname = rowByClassId.childNodes[2].innerHTML;
    let lname = rowByClassId.childNodes[3].innerHTML;

    //step 1 find student 
    const fetch1 = fetch(parent.BASE_URL + "/api/students/search/findByFnameAndLname?fname="+fname+"&lname="+lname,
                {
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

            //console.log("data from server: ", res);
            try{
            
                //get studentLink
                let studentLink = res._links.self.href;

                //find registrations of studentLink

                 const fetch2 = fetch(parent.BASE_URL + "/api/registers/search/findByStudent?student="+studentLink,
                        {
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


                   // console.log("data from server: ", res);
                    if(res._embedded.registers.length>0) {

                        let registerLink = res._embedded.registers[0]._links.self.href;

                        //delete corresponding payment of register

                        // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
                        //get payments

                        let url = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registerLink;
                        let request = new XMLHttpRequest();
                        request.open('GET', url, false);  // `false` makes the request synchronous
                        request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                        request.setRequestHeader("Content-type", "application/json");
                        request.contentType = "application/json"
                        request.send(null);

                        if (request.status === 200) {

                            let resObj = JSON.parse(request.responseText);
                            //console.log("sync call 1:", resObj);

                            let paymentLinks = resObj._embedded.payeds; //has to be fixed for many????
                            //delete all payments first
                                let url2=""; 
                                let request2 ="";

                                for(let ww=0; ww<paymentLinks.length; ww++){
                                    url2 = paymentLinks[ww]._links.payed.href;
                                    request2 = new XMLHttpRequest();
                                    request2.open('delete', url2, false);  // `false` makes the request synchronous
                                    request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                    request2.setRequestHeader("Content-type", "application/json");
                                    request2.contentType = "application/json"
                                    request2.send(null);
                                    
                                    if (request2.status === 204) {
                                        console.log("deleted payment:"+paymentLinks[ww]);
                                    }
                                }

                                //delete registration after deleted payments

                                let url3 = registerLink;
                                let request3 = new XMLHttpRequest();
                                request3.open('delete', url3, false);  // `false` makes the request synchronous
                                request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                request3.setRequestHeader("Content-type", "application/json");
                                request3.contentType = "application/json"
                                request3.send(null); 
                                if (request3.status === 204) {
                                    alert("Register is deleted succesfully");
                                    window.location.reload(true);
                                }  else {
                                alert("Something bad happened.Please try again!");
                            }

                        }

                    } else {

                        alert("Student has no registrations to delete");
                        window.location.reload(true);
                    }

                });
           
            }
            catch (e){
                alert("Something bad happened. Error: "+e.message+". Please try again");
                window.location.reload(true);
            }

        });
}

const send_email = (first,last,email,msg) =>{
    //debugger;
    //console.log("hey from send email");
    //console.log("first: "+first+" last: "+last+" email: "+email+" msg:"+msg);
    //send email request to server side 
    //http://localhost:8181/email?fname=myros&lname=Apostolakis&email=myapos@yahoo.com&msg=test%20message%20sdfaf%20asdsd
    const fetch1 = fetch(parent.BASE_URL + "/email?fname="+first+"&lname="+last+"&email="+email+"&msg="+msg+"&mode=selectedClasses", {
        method: 'get',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
            'Content-Type': 'application/json'
        }
    })
    .then(res => {

        if(res.status === 200) {
            alert("Emails where send succesfully");
        }
        else{
            alert("Something bad happened");
        }

  }); 

}//end of send_email

export const msgSubmitted = (msg, selectedClass) => {
    //debugger;
    parent.msgSubmitted = msg;


    //steps

    //find students who have payed for the selected class

    //get selected classes from server

        const fetch1 = fetch(parent.BASE_URL + "/api/studentClasses/search/findBydescription" +
            "?description=" + selectedClass, {
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

            //console.log("data from server: ", res);
            parent.classDescriptionForEmails = res.description;
            //get registrations by student class

            const fetch2 = fetch(parent.BASE_URL + "/api/registers/search/findByStudentClass" +
            "?studentClass=" + res._links.self.href, {
                method: 'get',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
            .then(res2 => res2.json())
            .then(res2 => {

                //console.log("data from server: ", res2);


                //for all registrations get students who have payed for them and send emails
                //so in this step get payments by registrations

                //first search to set a flag if payments exist. This is useful in order to display messages to the user

                    parent.flagPaymentsExist = 0;
                    res2._embedded.registers.map((el,count)=>{
                    
                        //use sync calls here!!

                        let urlT = parent.BASE_URL + "/api/payeds/search/findByRegister" +
                         "?register=" + el._links.self.href;
                        let requestT = new XMLHttpRequest();
                        requestT.open('GET', urlT, false);  // `false` makes the request synchronous
                        requestT.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                        requestT.setRequestHeader("Content-type", "application/json");
                        requestT.contentType = "application/json"
                        requestT.send(null);

                        if (requestT.status === 200) {
                            let resObjT = JSON.parse(requestT.responseText);
                            if(resObjT._embedded.payeds.length>0){
                                //alert("No student have payed yet for class:"+parent.classDescriptionForEmails);
                                 parent.flagPaymentsExist = 1;
                                 return; //stop execution of function
                            }
                        }
                    })

                res2._embedded.registers.map((el,count)=>{
                    
                    //console.log("e:",el);
                    //console.log("count registrations:"+count);
                    //use sync calls here!!

                    let url = parent.BASE_URL + "/api/payeds/search/findByRegister" +
                     "?register=" + el._links.self.href;
                    let request = new XMLHttpRequest();
                    request.open('GET', url, false);  // `false` makes the request synchronous
                    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request.setRequestHeader("Content-type", "application/json");
                    request.contentType = "application/json"
                    request.send(null);

                    if (request.status === 200) {

                        let resObj = JSON.parse(request.responseText);
                        //console.log("sync call 1:", resObj);

                        //get student
                        if(!parent.flagPaymentsExist){
                            alert("No student have payed yet for class:"+parent.classDescriptionForEmails);
                        }
                        else{
                            resObj._embedded.payeds.map((p)=>{

                                let url2 = el._links.student.href;
                                let request2 = new XMLHttpRequest();
                                request2.open('GET', url2, false);  // `false` makes the request synchronous
                                request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                request2.setRequestHeader("Content-type", "application/json");
                                request2.contentType = "application/json"
                                request2.send(null);

                                if (request2.status === 200) {
                                    let student = JSON.parse(request2.responseText);
                                    //console.log("sync call 2:", student);


                                    //send emails if payment is true

                                    if(p.payment) {


                                        //send email to student
                                        send_email(student.fname, student.lname, student.email,parent.msgSubmitted);
                                    }
                                }
                                else {
                                   alert("Something bad happened");

                                }

                            })
                        }//end of else
                    }

                })

            }) 

        })

}

export const getSubClass = (url, parentDesc, obj) => {
    //debugger;
    const fetch1 = 
    fetch(url, { 
       method: 'get', 
       mode: 'cors',
       cache: 'default',
       headers: {
         'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
         'Content-Type': 'application/json'
       }
     })
    .then (res => res.json())
    .then(res => { 
      //debugger;
      let classesPair = {};
      //console.log("data from server: ",res);
      classesPair[parentDesc] = res;
      //loadedPaymReg =1;
      return classesPair;
    });
    return fetch1;
}

export const getDataRegisters = (saved_student) => {
    //debugger;
    let students = saved_student;
    const dataRegisters = [];

    for(let jj=0; jj<students.length;jj++){
    //synchronous calls.......... 
    //get data of registered students

      let url = students[jj]._links.student.href;

      //Get id for register
      let ar = url.split("/");
      let s = ar.length;
      let id = ar[s - 1];
      // let request1 = new XMLHttpRequest();
      // request1.open('GET', url, false);  // `false` makes the request synchronous
      // request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
      // request1.setRequestHeader("Content-type", "application/json");
      // request1.contentType = "application/json"
      // request1.send(null);
      const fetch1 = fetch(url, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
            })
      .then(res1 => res1.json())
      .then(res1 => {
      //if (request1.status === 200) {

        //console.log(JSON.parse(request1.responseText));

        //2nd sync call
        //get registrations of all students

        let url2 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;


        //http://localhost:8181/api/registers/search/findByStudent?student=http://localhost:8181/api/students/136
        // let request2 = new XMLHttpRequest();
        // request2.open('GET', url2, false);  // `false` makes the request synchronous
        // request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        // request2.setRequestHeader("Content-type", "application/json");
        // request2.contentType = "application/json"
        // request2.send(null);

        // if (request2.status === 200) {
          const fetch2 = fetch(url2, {
                        method: 'get',
                        mode: 'cors',
                        cache: 'default',
                        headers: {
                            'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                            'Content-Type': 'application/json'
                        }
                })
          .then(res2 => res2.json())
          .then(res2 => {
            //console.log("sync call 2:",JSON.parse(request2.responseText));
            let registrations = res2;//JSON.parse(request2.responseText);

            //if student has registers get the classes of registers
            if (registrations._embedded.registers.length > 0) {

                //console.log("student has registrations");
                //for every registration get registered classes
                for (let ww=0; ww<registrations._embedded.registers.length; ww++){
                
                let url3 = registrations._embedded.registers[ww]._links.studentClass.href;

                //let url3 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;

                // let request3 = new XMLHttpRequest();
                // request3.open('GET', url3, false);  // 'false' makes the request synchronous
                // request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                // request3.setRequestHeader("Content-type", "application/json");
                // request3.contentType = "application/json"
                // request3.send(null);

                // if (request3.status === 200) {
                const fetch23= fetch(url3, {
                              method: 'get',
                              mode: 'cors',
                              cache: 'default',
                              headers: {
                                  'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                  'Content-Type': 'application/json'
                              }
                      })
                .then(res3 => res3.json())
                .then(res3 => {
                     //console.log("sync call 3:",JSON.parse(request3.responseText));
                    
                     //save tempData

                     let tempData ={};
                 // tempData.fname = JSON.parse(request1.responseText).fname;
                 // tempData.lname = JSON.parse(request1.responseText).lname;
                 // tempData.email = JSON.parse(request1.responseText).email;
                 tempData.fname = res1.fname;
                 tempData.lname = res1.lname;
                 tempData.email = res1.email;

                 tempData.class = res3.description;//JSON.parse(request3.responseText).description;

                 let dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);

                 let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                 tempData.dateOfRegistration = formatedDate;
                 tempData.index = dataRegisters.length+1;
                 dataRegisters.push(tempData);
                 parent.studentIndexWithRegistrations.push(tempData.index); //save index of students with registrations
                 //debugger;
                 parent.loadedReg = true;
                 return dataRegisters;
                })

                }

            }
            else {

                //console.log("no registrations");

                //save tempData

                  let tempData ={};
                // tempData.fname = JSON.parse(request1.responseText).fname;
                // tempData.lname = JSON.parse(request1.responseText).lname;
                // tempData.email = JSON.parse(request1.responseText).email;
              tempData.fname = res1.fname;
              tempData.lname = res1.lname;
              tempData.email = res1.email;
                tempData.class = "No registered classes";

                //let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                tempData.dateOfRegistration = "No date of registration";
                tempData.index = dataRegisters.length+1;
                dataRegisters.push(tempData);
                return dataRegisters;
            }

        })
    })
    return fetch1;
  }
    
}

