parent.request1 = {};
parent.rowDescription = {};
parent.students = {};
parent.studentClasses = {};
parent.registers = {};
parent.payeds = {};

/* hide all loaders*/
const hideloader = (className) => {
  // debugger;
  console.log('preparing to hide loader with className');
  let loader = document.getElementsByClassName(className)[0];
  loader.style.display = 'none';
};
export const getStudentClasses = () => {
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
        const classes = res._embedded.studentClasses;
        parent.studentClasses = classes;
        hideloader('loader studentClasses');
        return classes;     
    });
};
export const getStudents = () => {

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
        const students = res._embedded.students;
        parent.students = students;
        hideloader('loader students');
        return students;
    });
}
export const getRegisters = () => {
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
        const registers = res._embedded.registers;
        parent.registers = registers;
        return registers;
    });
}

export const getPayeds = () => {
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
        const payeds = res._embedded.payeds;
        parent.payeds = payeds;
        //hideloader('loader payments');
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
}

export const saveNewClass = (row) => {

    var request1 = createCORSRequest1("post", parent.BASE_URL + "/api/studentClasses");
    if (request1) {
        request1.onload = function() {
            if (request1.status === 201) {
                alert("A new record has been created in database. Page is reloading");
                window.location.reload(true);
            }

        };

        request1.open("post", parent.BASE_URL + "/api/studentClasses");
        request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request1.setRequestHeader("Content-type", "application/json");
        request1.contentType = "application/json";

        /*this has to be fixed* sets subclass*/
        //find subclass by row.subClassdescription
        //debugger;
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

    let x = document.getElementById("studentClasses");
    let rowByClassId = x.querySelectorAll('tr')[classId];
    let description = rowByClassId.childNodes[2].innerHTML;

    if( description === "No subclass") {
        alert("You can not delete this class. It is used for declaring classes with no subclasses. Please choose a different one.")
    } else {
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

}

/*update selected class from table -- desc parameter is the description in front end table not in the database*/

export const updateStudentClass = (newdesc, rowUpdate) => {
    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74

    let bodyData = JSON.stringify({
        "description": newdesc,
        "studentClass": rowUpdate._links.self.href
    });
    //debugger;
    if(rowUpdate.description === "No subclass") {
        alert("You can not update this class. It is used for declaring classes with no subclasses. Please choose a different one.")
    } else {
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
            window.location.reload(true);

        }

        })
    }
}

export const saveNewStudent = (row) => {
    //check email type
    let str = row.email;
    let n = str.includes("@");
    let exist = false;
    //check if student exist already in database due to fname, lname, mobile
    let students = parent.students;
    students.push(row);
    exist = students.map((obj, key) => {
        let rowtoCheck = students[students.length -1];
        if( key <= students.length -2 
            && rowtoCheck.fname === obj.fname 
            && rowtoCheck.lname === obj.lname 
            && rowtoCheck.phone === obj.phone) {
            return true;
        } else {
            return false;
        }
    })

    let existV = exist.reduce((total, num) => {
        console.log('total:', total, ' num ', num);
        return total || num;
    });
    if(!existV) {
        if(n) {
            let date = new Date(row.dateOfBirth);

            let bodyData = JSON.stringify({
                "fname": row.fname,
                "lname": row.lname,
                "email": row.email,
                "dateOfBirth": date,
                "facebook": row.facebook,
                "phone": row.phone,
                "manager": parent.BASE_URL + "/api/managers/17"
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
                    window.location.reload(true);
                    }
                    else {
                        alert("something bad happened.Please check your input data.");    
                    }
            })
        } 
        else {
            alert("Please check email input and try again. It has to be of email type. Example test@test.com");   
        }
    } else {
        alert("User already exists in database"); 
    }
    

}


/*deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export const deleteStudent = (studentId) => {

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
            "manager": parent.BASE_URL + "/api/managers/17"
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
            window.location.reload(true);
        }

        })
    } else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com"); 
         window.location.reload(true);  
    }
}
//this is not used/ updatePaymentRegisters is used for creation also
export const addPaymentRegisters = (row) => {

    // let url = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
    // //step 1 find student by fname and lname

    // let request = new XMLHttpRequest();
    // request.open('GET', url, false);  // `false` makes the request synchronous
    // request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    // request.setRequestHeader("Content-type", "application/json");
    // request.contentType = "application/json"
    // request.send(null); 
    // if (request.status === 200) {

    //     let resObj = JSON.parse(request.responseText);
    //     let student = resObj._links.self.href;
    //     //step 2 find student class by description row.class "http://localhost:8181/api/studentClasses/search/findBydescription{?description}",

    //     let url2St = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
    //     let request2St = new XMLHttpRequest();
    //     request2St.open('GET', url2St, true);  // `false` makes the request synchronous
    //     request2St.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    //     request2St.setRequestHeader("Content-type", "application/json");
    //     request2St.contentType = "application/json"
    //     request2St.send(null);
    // } 
}

export const updatePaymentRegisters = (updateMode , row) => {
    if (updateMode === "paymentUpdate" || updateMode === "paymentNotesUpdate" ||
        updateMode === "updateDateOfPayment" || updateMode === "addPayment"){
        
         //step 1 find student by student fname and lname
        let url = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
        let request = new XMLHttpRequest();
        request.open('GET', url, true);  // `false` makes the request synchronous
        request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request.setRequestHeader("Content-type", "application/json");
        request.contentType = "application/json";
        request.row = row; //pass row in object 
        request.onload = function (e) {
          if (request.readyState === 4) {
            if (request.status === 200) {
              console.log(request.responseText);
              
              let resObj = JSON.parse(request.responseText);
              let student = resObj._links.self.href;

              //step 2 find student class by description row.class "http://localhost:8181/api/studentClasses/search/findBydescription{?description}",
              let url2St = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+this.row.class;
              let request2St = new XMLHttpRequest();
              request2St.open('GET', url2St, true);  // `false` makes the request synchronous
              request2St.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
              request2St.setRequestHeader("Content-type", "application/json");
              request2St.contentType = "application/json";
              request2St.row = this.row; //pass row in object
              request2St.onload = function (e){
                if(request2St.readyState === 4){
                    if(request2St.status === 200) {

                        let resObj2St = JSON.parse(request2St.responseText);

                        //step 2.1 find register by student class

                        let url21 = parent.BASE_URL+"/api/registers/search/findByStudentAndStudentClass?student="
                            +student+"&studentClass="+resObj2St._links.self.href;

                        let request21 = new XMLHttpRequest();
                        request21.open('GET', url21, true);  // `false` makes the request synchronous
                        request21.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                        request21.setRequestHeader("Content-type", "application/json");
                        request21.contentType = "application/json";
                        request21.row = this.row; //pass row in object
                        request21.onload = function (e){
                            if(request21.readyState === 4){
                                if(request21.status === 200){
                                    
                                    let resObj21 = JSON.parse(request21.responseText); 
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
                                    request3.open('GET', url3, true);  // `false` makes the request synchronous
                                    request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                    request3.setRequestHeader("Content-type", "application/json");
                                    request3.contentType = "application/json";
                                    request3.row = this.row;
                                    request3.onload = function(e) {
                                        if(request3.readyState === 4) {
                                            if(request3.status === 200){
                                                let resObj3 = JSON.parse(request3.responseText);

                                                //ean den iparxei plirwmi tote dimiourgise ti alliws kane update
                                                if (resObj3._embedded.payeds.length ==0) {
                                                    //edw
                                                    let payment = parent.BASE_URL+"/api/payeds/";

                                                    //step 3.2 update payments
                                                    let date = new Date(row.dateOfPayment.substr(0, 10));

                                                    let bodyData = JSON.stringify({
                                                            "payment" : row.payment,
                                                            "dateOfPayment": date,
                                                            "notes": row.notes,
                                                            "register": register
                                                    });

                                                    let request5 = new XMLHttpRequest();
                                                    request5.open('POST', payment, true);  // `false` makes the request synchronous
                                                    request5.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                                    request5.setRequestHeader("Content-type", "application/json");
                                                    request5.contentType = "application/json";
                                                    request5.row = this.row;
                                                    request5.onload = function(e){
                                                        if(request5.readyState === 4){
                                                            if (request5.status === 201) {
                                                                let resObj5 = JSON.parse(request5.responseText);
                                                                alert("Payment has been updated in database. Page is reloading");
                                                                window.location.reload(true);  
                                                            }
                                                            else {

                                                                alert("Something bad has happened. Please try again");
                                                            }
                                                        }
                                                    }
                                                    request5.send(bodyData);


                                                    
                                                } else {
                                                    //ki edw
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
                                                    request4.open('PATCH', payment, true);  // `false` makes the request synchronous
                                                    request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                                    request4.setRequestHeader("Content-type", "application/json");
                                                    request4.contentType = "application/json";
                                                    request4.row = this.row;
                                                    request4.onload = function(e) {
                                                        if(request4.readyState === 4){
                                                            if (request4.status === 200){
                                                                let resObj4 = JSON.parse(request4.responseText);
                                                                 if (s === resObj3._embedded.payeds.length -1){
                                                                    alert("Payment has been updated in database. Page is reloading");
                                                                    window.location.reload(true);  
                                                                }else {

                                                                    alert("Something bad has happened. Please try again");

                                                                }
                                                            }
                                                        }

                                                    }
                                                    request4.send(bodyData);

                                                }//end of for 2
                                            } //end of else

                                            }
                                        }
                                    }
                                    request3.send(null);
                                }
                            }
                        }
                        request21.send(null);
                    }
                }
              }
              request2St.send(null);
            } else {
              console.error(request.statusText);
            }
          }
        }
        request.send(null);
    }

}

export const deletePaymentRegisters = (id) => {

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

            // step 2 find registration id by class

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

                         // step 3 find payments by registration id

                         if(res3._embedded.payeds.length>0){
 
                            //step 4  delete payment which is found
                            for(let vv=0; vv< res3._embedded.payeds.length; vv++){


                                let paymentUrl = res3._embedded.payeds[vv]._links.self.href;

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
    //create call -- we need student id, studentClass id, dateOfRegistration


    //find studentClass id

        let url = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
        let request = new XMLHttpRequest();
        request.open('GET', url, true);  // `false` makes the request synchronous
        request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request.setRequestHeader("Content-type", "application/json");
        request.contentType = "application/json";
        request.row = row;
        request.onload = function(e) {
            if (request.readyState === 4) {
                if(request.status === 200) {
                    let resObj = JSON.parse(request.responseText);

                    let classLink = resObj._links.self.href; //has to be fixed for many


                    let url2 = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+this.row.fname+"&lname="+this.row.lname;
                    let request2 = new XMLHttpRequest();
                    request2.open('GET', url2, true);  // `false` makes the request synchronous
                    request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request2.setRequestHeader("Content-type", "application/json");
                    request2.contentType = "application/json";
                    request2.row = this.row;
                    request2.onload = function (e) {
                        if (request2.readyState === 4) {
                            if (request2.status === 200){
                               //step 2 find student id to update
                               let resObj2 = JSON.parse(request2.responseText);


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
                               request3.open('POST', url3, true);  // `false` makes the request synchronous
                               request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                               request3.setRequestHeader("Content-type", "application/json");
                               request3.contentType = "application/json";
                               request3.row = this.row;
                               request3.onload = function (e){
                                if(request3.readyState ===4) {
                                    if(request3.status === 201){
                                        let resObj3 = JSON.parse(request2.responseText);
                                        alert("Registration has been created in database. Page is reloading");
                                        //window.location.reload(true);
                                    } else {
                
                                        alert("Something bad has happened. Please try again");

                                    }

                                }
                               }
                               request3.send(bodyData); 
                            }
                        }
                    }
                    request2.send(null);
                }
            }
        }
        request.send(null);
}

export const updateRegisters = (row) => {

    //create call -- we need student id, studentClass id, dateOfRegistration

    //find studentClass id

    let url = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json";
    request.row = row;
    request.onload = function (e){
        if(request.readyState === 4){
            if(request.status === 200){
                let resObj = JSON.parse(request.responseText);
                let classLink = resObj._links.self.href; //has to be fixed for many????

                let url2 = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+this.row.fname+"&lname="+this.row.lname;
                let request2 = new XMLHttpRequest();
                request2.open('GET', url2, true);  // `false` makes the request synchronous
                request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                request2.setRequestHeader("Content-type", "application/json");
                request2.contentType = "application/json";
                request2.onload = function (e){
                    if(request2.readyState === 4){
                        if(request2.status === 200){
                            //step 2 find student id to update
                            let resObj2 = JSON.parse(request2.responseText);
                            let studentLink = resObj2._links.self.href; //has to be fixed for many

                            //new registration call

                            let url3 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+studentLink;
                            let request3 = new XMLHttpRequest();
                            request3.open('GET', url3, true);  // `false` makes the request synchronous
                            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                            request3.setRequestHeader("Content-type", "application/json");
                            request3.contentType = "application/json";
                            request3.onload = function (e){
                                if(request3.readyState === 4){
                                    if(request3.status === 200){
                                        let resObj3 = JSON.parse(request3.responseText);
                                        let date = new Date(row.dateOfRegistration.substr(0, 10));

                                        let bodyData = JSON.stringify({
                                                "studentClass" : classLink,
                                                "dateOfRegistration": date,
                                                "student": studentLink
                                        });

                                        //update registration for student
                                        let url4 = resObj3._embedded.registers[0]._links.self.href;
                                        let request4 = new XMLHttpRequest();
                                        request4.open('PATCH', url4, true);  // `false` makes the request synchronous
                                        request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                        request4.setRequestHeader("Content-type", "application/json");
                                        request4.contentType = "application/json";
                                        request4.onload = function (e){
                                            if(request4.readyState === 4){
                                                if(request4.status === 200){
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

                                        request4.send(bodyData);
                                    }
                                }

                            }
                            request3.send(null);
                        }
                    }

                }
                request2.send(null);
            }
        }

    }
    request.send(null);
}
export const deleteRegisters__ = (registerId) => {

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
                    //debugger;
                    if(res._embedded.registers.length>0) {

                        let registerLink = res._embedded.registers[0]._links.self.href;

                        //delete corresponding payment of register

                        // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
                        //get payments

                        let url = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registerLink;
                        let request = new XMLHttpRequest();
                        request.open('GET', url, true);  // `false` makes the request synchronous
                        request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                        request.setRequestHeader("Content-type", "application/json");
                        request.contentType = "application/json";
                        request.onload = function (e){
                            if(request.readyState === 4){
                                if(request.status === 200){
                                    let resObj = JSON.parse(request.responseText);
                                    //console.log("sync call 1:", resObj);
                                    //debugger;
                                    let paymentLinks = resObj._embedded.payeds; //has to be fixed for many????
                                    //delete all payments first
                                        let url2=""; 
                                        let request2 ="";

                                        for(let ww=0; ww<paymentLinks.length; ww++){
                                            url2 = paymentLinks[ww]._links.payed.href;
                                            request2 = new XMLHttpRequest();
                                            request2.open('delete', url2, true);  // `false` makes the request synchronous
                                            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                            request2.setRequestHeader("Content-type", "application/json");
                                            request2.contentType = "application/json";
                                            request2.onload = function (e){
                                                if(request2.readyState === 4){
                                                    if(request2.status === 204){
                                                        console.log("deleted payment:"+paymentLinks[ww]);

                                                        //delete registration after deleted payments
                                                        //debugger;
                                                        let url3 = registerLink;
                                                        let request3 = new XMLHttpRequest();
                                                        request3.open('delete', url3, true);  // `false` makes the request synchronous
                                                        request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                                        request3.setRequestHeader("Content-type", "application/json");
                                                        request3.contentType = "application/json";
                                                        request3.send(null); 
                                                        request3.onload = function (e){
                                                            if(request3.readyState === 4){
                                                                if(request3.status === 204){
                                                                    alert("Register is deleted succesfully");
                                                                    window.location.reload(true);
                                                                }else {
                                                                    alert("Something bad happened.Please try again!");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                            }
                                            request2.send(null);
                                        }
                                }
                                else {
                                    alert("Student has no registrations to delete");
                                    window.location.reload(true);
                                }
                            }

                        }
                        request.send(null);
                    }
                });
           
            }
            catch (e){
                alert("Something bad happened. Error: "+e.message+". Please try again");
                window.location.reload(true);
            }

        });
}

export const deleteRegisters = (registerId) => {
    let x = document.getElementById("registers");
    let rowByClassId = x.querySelectorAll('tr')[registerId];
    let fname = rowByClassId.childNodes[2].innerHTML;
    let lname = rowByClassId.childNodes[3].innerHTML;

    //step 1 find student 
    let url = parent.BASE_URL + "/api/students/search/findByFnameAndLname?fname="+fname+"&lname="+lname
    let requestFindStudent = new XMLHttpRequest();
    requestFindStudent.open('GET', url, true);  // `false` makes the request synchronous
    requestFindStudent.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    requestFindStudent.setRequestHeader("Content-type", "application/json");
    requestFindStudent.contentType = "application/json";
    requestFindStudent.onload = function (e){
        if(requestFindStudent.readyState === 4){
            if(requestFindStudent.status === 200){
                let res = JSON.parse(requestFindStudent.responseText);
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
                        
                        if(res._embedded.registers.length>0) {

                            let registerLink = res._embedded.registers[0]._links.self.href;

                            //delete corresponding payment of register

                            // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
                            //get payments

                            let url = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registerLink;
                            let request = new XMLHttpRequest();
                            request.open('GET', url, true);  // `false` makes the request synchronous
                            request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                            request.setRequestHeader("Content-type", "application/json");
                            request.contentType = "application/json";
                            request.registerLink = registerLink;
                            request.onload = function (e){
                                if(request.readyState === 4){
                                    if(request.status === 200){
                                        
                                        let resObj = JSON.parse(request.responseText);
                                        //console.log("sync call 1:", resObj);

                                        let paymentLinks = resObj._embedded.payeds; //has to be fixed for many????
                                        //delete all payments first
                                            let url2=""; 
                                            let request2 ="";
                                            
                                            for(let ww=0; ww<paymentLinks.length; ww++){
                                                url2 = paymentLinks[ww]._links.payed.href;
                                                request2 = new XMLHttpRequest();
                                                request2.open('delete', url2, true);  // `false` makes the request synchronous
                                                request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                                request2.setRequestHeader("Content-type", "application/json");
                                                request2.contentType = "application/json";
                                                request2.registerLink = this.registerLink;
                                                request2.onload = function (e){
                                                    if(request2.readyState === 4){
                                                        if(request2.status === 204){
                                                            console.log("deleted payment:"+paymentLinks[ww]);
                                                            //delete registration after deleted payments

                                                            let url3 = this.registerLink;
                                                            let request3 = new XMLHttpRequest();
                                                            request3.open('delete', url3, true);  // `false` makes the request synchronous
                                                            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                                            request3.setRequestHeader("Content-type", "application/json");
                                                            request3.contentType = "application/json";
                                                            request3.onload = function (e){
                                                                if(request3.readyState === 4){
                                                                    if(request3.status === 204){
                                                                        alert("Register is deleted succesfully");
                                                                        //window.location.reload(true);
                                                                    }  else {
                                                                        alert("Something bad happened.Please try again!");
                                                                    }
                                                                }

                                                            }
                                                            request3.send(null); 
                                                            
                                                        }
                                                    }

                                                }
                                                request2.send(null);

                                            }


                                    }
                                }

                            }
                            request.send(null);

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
            }
        }

    }
    requestFindStudent.send(null);

    // const fetch1 = fetch(parent.BASE_URL + "/api/students/search/findByFnameAndLname?fname="+fname+"&lname="+lname,
    //             {
    //                 method: 'get',
    //                 mode: 'cors',
    //                 cache: 'default',
    //                 headers: {
    //                     'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                     'Content-Type': 'application/json'
    //                 }
    //         })
    //     .then(res => {
    //         try{
    //             debugger;
    //             return res.json();
    //         }
    //         catch (e){
    //             alert("Something bad happened. Error: "+e.message+". Please try again");
    //             window.location.reload(true);
    //         }
            
    //     }
            
    //         )
    //     .then(res => {
    //         try{
            
    //             //get studentLink
    //             let studentLink = res._links.self.href;

    //             //find registrations of studentLink

    //              const fetch2 = fetch(parent.BASE_URL + "/api/registers/search/findByStudent?student="+studentLink,
    //                     {
    //                         method: 'get',
    //                         mode: 'cors',
    //                         cache: 'default',
    //                         headers: {
    //                             'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                             'Content-Type': 'application/json'
    //                         }
    //                     })
    //             .then(res => res.json())
    //             .then(res => {
    //                 debugger;
    //                 if(res._embedded.registers.length>0) {

    //                     let registerLink = res._embedded.registers[0]._links.self.href;

    //                     //delete corresponding payment of register

    //                     // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
    //                     //get payments

    //                     let url = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registerLink;
    //                     let request = new XMLHttpRequest();
    //                     request.open('GET', url, false);  // `false` makes the request synchronous
    //                     request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    //                     request.setRequestHeader("Content-type", "application/json");
    //                     request.contentType = "application/json";
    //                     request.send(null);

    //                     if (request.status === 200) {
    //                         debugger;
    //                         let resObj = JSON.parse(request.responseText);
    //                         //console.log("sync call 1:", resObj);

    //                         let paymentLinks = resObj._embedded.payeds; //has to be fixed for many????
    //                         //delete all payments first
    //                             let url2=""; 
    //                             let request2 ="";
    //                             debugger;
    //                             for(let ww=0; ww<paymentLinks.length; ww++){
    //                                 url2 = paymentLinks[ww]._links.payed.href;
    //                                 request2 = new XMLHttpRequest();
    //                                 request2.open('delete', url2, false);  // `false` makes the request synchronous
    //                                 request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    //                                 request2.setRequestHeader("Content-type", "application/json");
    //                                 request2.contentType = "application/json";
    //                                 request2.send(null);
                                    
    //                                 if (request2.status === 204) {
    //                                     console.log("deleted payment:"+paymentLinks[ww]);
    //                                 }
    //                             }

    //                             //delete registration after deleted payments

    //                             let url3 = registerLink;
    //                             let request3 = new XMLHttpRequest();
    //                             request3.open('delete', url3, false);  // `false` makes the request synchronous
    //                             request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    //                             request3.setRequestHeader("Content-type", "application/json");
    //                             request3.contentType = "application/json";
    //                             request3.send(null); 
    //                             debugger;
    //                             if (request3.status === 204) {
    //                                 alert("Register is deleted succesfully");
    //                                 window.location.reload(true);
    //                             }  else {
    //                             alert("Something bad happened.Please try again!");
    //                         }

    //                     }

    //                 } else {

    //                     alert("Student has no registrations to delete");
    //                     window.location.reload(true);
    //                 }

    //             });
           
    //         }
    //         catch (e){
    //             alert("Something bad happened. Error: "+e.message+". Please try again");
    //             window.location.reload(true);
    //         }

    //     });
}

const send_email = (first,last,email,msg) =>{
    //send email request to server side 
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
            console.log('Emails where send succesfully');
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

                //for all registrations get students who have payed for them and send emails
                //so in this step get payments by registrations

                //first search to set a flag if payments exist. This is useful in order to display messages to the user

                    parent.flagPaymentsExist = 0;
                    var flagPaymentsExistAr = [];
                    var checkNumOfRegisters = res2._embedded.registers.length;

                    res2._embedded.registers.map((el,count)=>{
                        //console.log('log:', count);

                        let urlT = parent.BASE_URL + "/api/payeds/search/findByRegister" +
                         "?register=" + el._links.self.href;
                        let requestT = new XMLHttpRequest();
                        requestT.open('GET', urlT, true);  // `false` makes the request synchronous
                        requestT.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                        requestT.setRequestHeader("Content-type", "application/json");
                        requestT.contentType = "application/json";
                        requestT.count = count;
                        requestT.onload = function (e){
                            if(requestT.readyState === 4){
                                if(requestT.status === 200){
                                    let resObjT = JSON.parse(requestT.responseText);

                                    if(resObjT._embedded.payeds.length>0){
                                        flagPaymentsExistAr.push(1);
                                        resObjT._embedded.payeds.map((p)=>{

                                            let url2 = el._links.student.href;
                                            let request2 = new XMLHttpRequest();
                                            request2.open('GET', url2, true);  // `false` makes the request synchronous
                                            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                            request2.setRequestHeader("Content-type", "application/json");
                                            request2.contentType = "application/json";
                                            request2.onload = function (e){
                                                if(request2.readyState === 4){
                                                    if(request2.status === 200){
                                                        let student = JSON.parse(request2.responseText);

                                                        //send emails if payment is true

                                                        if(p.payment) {
                                                            //send email to student
                                                            send_email(student.fname, student.lname, student.email,parent.msgSubmitted);
                                                        }
                                                    } else {
                                                       alert("Something bad happened");
                                                    }
                                                }

                                            }
                                            request2.send(null);
                                        })
                                    } else {
                                        flagPaymentsExistAr.push(0);

                                    }

                                    //ean teleiwsan ta requests kai to a8roisma olwn twn el tou flagPaymentsExistAr einai 0 
                                    //tote den iparxoun plirwmes
                                    const sum = flagPaymentsExistAr.reduce((total, el) => {
                                        return total + el;
                                    });
                                    //debugger;
                                    if(!sum && (this.count + 1) === checkNumOfRegisters) {
                                        alert("No student have payed yet for the selected class");
                                    } else        if ( (this.count + 1) === checkNumOfRegisters ) {
                                        alert("All emails where send succesfully");
                                    }
                                }
                            }

                        }
                        requestT.send(null);
                    })
            })
        })
}
export const msgSubmitted____ = (msg, selectedClass) => {
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
                                
                                parent.flagPaymentsExist = 1;
                                return; //stop execution of function
                            }
                        }
                    })

                res2._embedded.registers.map((el,count)=>{
                    
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

                                    //send emails if payment is true
                                    //debugger;
                                    console.log('log:', p);
                                    if(p.payment) {

                                        //send email to student
                                        send_email(student.fname, student.lname, student.email,parent.msgSubmitted);
                                    }
                                }
                                else {
                                   alert("Something bad happened");
                                }
                            })
                        } //end of else
                    }

                })

            }) 

        })

}

export const getSubClass = (url, parentDesc, obj) => {

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

      let classesPair = {};

      classesPair[parentDesc] = res;

      return classesPair;
    });
    return fetch1;
}

export const getDataRegisters = (saved_student) => {
 
    let students = saved_student;
    let dataRegisters = [];

    var studentPromises = students.map ( (student, key) => {
        let fetch1;
        let url = student._links.student.href;
        let ar = url.split("/");
        let s = ar.length;
        let id = ar[s - 1];

        fetch1 = fetch(url, {
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

            //2nd async call
            //get registrations of all students

            let url2 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+student._links.self.href;

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
                let registrations = res2;

                //if student has registers get the classes of registers
                if (registrations._embedded.registers.length > 0) {
                    // for every registration get registered classes
                    for (let ww=0; ww<registrations._embedded.registers.length; ww++){
                    
                    let url3 = registrations._embedded.registers[ww]._links.studentClass.href;

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
                    
                     //save tempData

                     let tempData ={};

                     tempData.fname = res1.fname;
                     tempData.lname = res1.lname;
                     tempData.email = res1.email;

                     tempData.class = res3.description;

                     let dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);

                     let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                     tempData.dateOfRegistration = formatedDate;
                     tempData.index = dataRegisters.length+1;
                     dataRegisters.push(tempData);
                     parent.studentIndexWithRegistrations.push(tempData.index); //save index of students with registrations
                     parent.loadedReg = true;
                     return dataRegisters;
                    })
                    }

                }
                else {
                    //save tempData
                    let tempData ={};
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
            return fetch2;
        })
        return fetch1;
    });
    Promise.all(studentPromises)
      .then(results => {
            //debugger;
            console.log('All studentPromises from getDataRegisters are done!!!');
            hideloader('loader registers');
      })

    return dataRegisters;
}

export const getDataPaymentsRegisters = (saved_student) => {
    
    //debugger;

    let fetch1;
    let dataPaymentRegisters = [];

    let request1 = {};

    let students = saved_student;
    var studentPromises = students.map ( (student, key) => { 
    //debugger;
    let url1 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+student._links.self.href;

    fetch1 = fetch(url1, {
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

        parent.isloading = 0;

        let registrations = res1;
       

        if(registrations._embedded.registers.length>0) {
        //get payments of those students . if there aren't any then you can set them
            //debugger;
            for(let jw=0; jw<registrations._embedded.registers.length;jw++){
              
              let url2 = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registrations._embedded.registers[jw]._links.self.href;
              
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

                let payments = res2;


                let tempData ={};
                tempData.fname = student.fname;
                tempData.lname = student.lname;
                tempData.email = student.email;

                if(typeof payments._embedded.payeds !== 'undefined') {
                    //get classes of registered students
                    let url3 = registrations._embedded.registers[jw]._links.studentClass.href;
                    const fetch3 = fetch(url3, {
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

                        let studentClasses = res3;//JSON.parse(request3.responseText);
                        let tempData ={};
                        if (typeof payments._embedded.payeds[0] !== 'undefined'){
                          tempData.fname = student.fname;
                          tempData.lname = student.lname;
                          tempData.email = student.email;
                          tempData.class = studentClasses.description;
                          
                          tempData.payment = payments._embedded.payeds[0].payment;
                          tempData.notes = payments._embedded.payeds[0].notes;
                          let date = new Date(payments._embedded.payeds[0].dateOfPayment);
                          let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                          tempData.dateOfPayment = formatedDate;
                          tempData.index = dataPaymentRegisters.length+1;
                          dataPaymentRegisters.push(tempData);
                          //debugger;
                          return dataPaymentRegisters;
                          //debugger;
                        }


                    })

                }
                else {

                    let url4 = registrations._embedded.registers[jw]._links.studentClass.href;

                    const fetch4 = fetch(url4, {
                                  method: 'get',
                                  mode: 'cors',
                                  cache: 'default',
                                  headers: {
                                      'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                      'Content-Type': 'application/json'
                                  }
                          })
                    .then(res4 => res4.json())
                    .then(res4 => {

                        let studentClasses = res4;
                        let tempData ={};
                        tempData.fname = student.fname;
                        tempData.lname = student.lname;
                        tempData.email = student.email;
                        tempData.class = studentClasses.description;
                        tempData.payment = false;
                        tempData.notes = "No payment yet";
                        let dateOfPayment = new Date("Sun Feb 01 1970 00:00:00 GMT+0200 (EET)"); //for none payments
                        let formatedDate = dateOfPayment.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                        tempData.dateOfPayment = formatedDate;
                        tempData.index = dataPaymentRegisters.length+1;
                        dataPaymentRegisters.push(tempData);
                        return dataPaymentRegisters;
                    })
                }
              })
              
            }
        }

      })
    return fetch1;
    })

    Promise.all(studentPromises)
      .then(results => {
        //debugger;
        console.log('All studentPromises from getDataPayments are done!!!');
        hideloader('loader payments');
    })
    //debugger;
    return dataPaymentRegisters;   
}
export const getDataPaymentsRegisters__ = (saved_student) => {
    
    //debugger;

    let fetch1;
    let dataPaymentRegisters = [];

    let request1 = {};
    let url1 = "";

    let students = saved_student;

    for(let jj=0; jj<students.length;jj++){

      //get students who has registered already
      url1 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;

      fetch1 = fetch(url1, {
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

          parent.isloading = 0;

          let registrations = res1;
         

          if(registrations._embedded.registers.length>0) {
          //get payments of those students . if there aren't any then you can set them

              for(let jw=0; jw<registrations._embedded.registers.length;jw++){
                
                let url2 = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registrations._embedded.registers[jw]._links.self.href;
                
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

                  let payments = res2;


                  let tempData ={};
                  tempData.fname = students[jj].fname;
                  tempData.lname = students[jj].lname;
                  tempData.email = students[jj].email;

                  if(typeof payments._embedded.payeds !== 'undefined') {
                      //get classes of registered students
                      let url3 = registrations._embedded.registers[jw]._links.studentClass.href;
                      const fetch3 = fetch(url3, {
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

                          let studentClasses = res3;//JSON.parse(request3.responseText);
                          let tempData ={};
                          if (typeof payments._embedded.payeds[0] !== 'undefined'){
                            tempData.fname = students[jj].fname;
                            tempData.lname = students[jj].lname;
                            tempData.email = students[jj].email;
                            tempData.class = studentClasses.description;
                            
                            tempData.payment = payments._embedded.payeds[0].payment;
                            tempData.notes = payments._embedded.payeds[0].notes;
                            let date = new Date(payments._embedded.payeds[0].dateOfPayment);
                            let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                            tempData.dateOfPayment = formatedDate;
                            tempData.index = dataPaymentRegisters.length+1;
                            dataPaymentRegisters.push(tempData);
                            //debugger;
                          }


                      })

                  }
                  else {

                      let url4 = registrations._embedded.registers[jw]._links.studentClass.href;

                      const fetch4 = fetch(url4, {
                                    method: 'get',
                                    mode: 'cors',
                                    cache: 'default',
                                    headers: {
                                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                        'Content-Type': 'application/json'
                                    }
                            })
                      .then(res4 => res4.json())
                      .then(res4 => {

                          let studentClasses = res4;//JSON.parse(request3.responseText);
                          let tempData ={};
                          tempData.fname = students[jj].fname;
                          tempData.lname = students[jj].lname;
                          tempData.email = students[jj].email;
                          tempData.class = studentClasses.description;
                          tempData.payment = false;
                          tempData.notes = "No payment yet";
                          let dateOfPayment = new Date("Sun Feb 01 1970 00:00:00 GMT+0200 (EET)"); //for none payments
                          let formatedDate = dateOfPayment.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                          tempData.dateOfPayment = formatedDate;
                          tempData.index = dataPaymentRegisters.length+1;
                          dataPaymentRegisters.push(tempData);

                      })
                    
                  }
                })
                
              }
          }

        })
    }
    
    return dataPaymentRegisters;   
}