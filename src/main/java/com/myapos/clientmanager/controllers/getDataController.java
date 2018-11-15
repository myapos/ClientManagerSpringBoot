/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.myapos.clientmanager.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import com.myapos.clientmanager.repository.*;
import com.myapos.clientmanager.model.*;
import com.myapos.clientmanager.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;

import java.util.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;


/**
 * @author Myron Apostolakis
 */
@Controller
@RequestMapping("/getData")
public class getDataController {
  private static final String template = "Hello, %s!";
  private final AtomicLong counter = new AtomicLong();

  private final StudentRepository students;
  private final RegisterRepository registers;
  private final StudentClassRepository studentClass;
  private final PayedRepository payments;

  @Autowired
  public getDataController(StudentRepository studentRepository,
      RegisterRepository registerRepository, StudentClassRepository studentClassRepository,
      PayedRepository payedRepository) {
    this.students = studentRepository;
    this.registers = registerRepository;
    this.studentClass = studentClassRepository;
    this.payments = payedRepository;
  }

   ArrayList<RegisterForDataRegisters> buildRegister(Iterable<Register> registers) {
     int count = 0;

     ArrayList<RegisterForDataRegisters> listOfRegisters = new ArrayList<RegisterForDataRegisters>();

     for(Register r : registers){
      //Do whatever you want
      count++;
      RegisterForDataRegisters register = 
        new RegisterForDataRegisters(
          count,
          r.getDateOfRegistration(), 
          r.getStudent().getFname(), 
          r.getStudent().getLname(), 
          r.getStudent().getEmail(),
          r.getStudent().getPhone(),
          r.getStudent().getFacebook(),
          r.getStudentClass().getDescription()
          );
        
        listOfRegisters.add(register);
         
         System.out.println("id: "+ r.getId() + " registration date: "+r.getDateOfRegistration()
          + " class description:" + r.getStudentClass().getDescription()
          + " student: " + r.getStudent().getFname() );
     }
     return listOfRegisters;
  }

  ArrayList<StudentClassForDataRegisters> buildClasses(Iterable<StudentClass> studentClasses) {

     ArrayList<StudentClassForDataRegisters> listOfStudentClasses 
      = new ArrayList<StudentClassForDataRegisters>();
     //StudentClassForDataRegisters
     for(StudentClass s : studentClasses){
      StudentClassForDataRegisters studentClassForDataRegisters = 
        new StudentClassForDataRegisters(s.getDescription());
      listOfStudentClasses.add(studentClassForDataRegisters);
       System.out.println("id: "+ s.getId() + " description: "+s.getDescription()
        +" get parent class:" + s.getStudentClass().getDescription());
        //Do whatever you want
     }
     return listOfStudentClasses;
  } 

 ArrayList<PaymentRegisters> buildPayments(Iterable<Register> registers, 
    PayedRepository paym) {
     ArrayList<PaymentRegisters> listOfPayments 
      = new ArrayList<PaymentRegisters>();
    int count = 0;
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy");
      String dateInString = "7-Jun-2013";
      Date date = formatter.parse(dateInString);
     for(Register r : registers){
        count++;
        //find all payments by registration
        System.out.println("fname from registration: " + r.getStudent().getFname());
        List<Payed> payments = paym.findByRegister(r);

        //if there are no payments 
        if(payments.size() == 0) {
          PaymentRegisters paymentRegisters = new PaymentRegisters(
            count,
            false,
            "There are no payments",
            date,
            r.getStudent().getFname(),
            r.getStudent().getLname(),
            r.getStudentClass().getDescription()
            );
          listOfPayments.add(paymentRegisters);
        } else {
          for(Payed p : payments) {
            System.out.println("Payment id: "+ p.getId() + " payment:" + 
             p.getPayment() + " notes: " + p.getNotes()+
             " date of payment: " + p.getDateOfPayment() + " fname: "+
             p.getRegister().getStudent().getFname() + " lname: "+ 
             p.getRegister().getStudent().getLname() + " class: " +
             p.getRegister().getStudentClass().getDescription());
            PaymentRegisters paymentRegisters = new PaymentRegisters(
            count,
            p.getPayment(),
            p.getNotes(),
            p.getDateOfPayment(),
            r.getStudent().getFname(),
            r.getStudent().getLname(),
            r.getStudentClass().getDescription()
            );
          listOfPayments.add(paymentRegisters);
          }
        }
     }
    } //end of try
    catch (ParseException e) {
            e.printStackTrace();
    }
    return listOfPayments;
  } 

  ArrayList<PaymentRegisters> buildPayments(Iterable<Payed> payments) {
     int count = 0;
      ArrayList<PaymentRegisters> listOfPayments 
       = new ArrayList<PaymentRegisters>();
      for(Payed p : payments){
       count++;
        PaymentRegisters paymentRegisters = new PaymentRegisters(
         count,
         p.getPayment(),
         p.getNotes(),
         p.getDateOfPayment(),
         p.getRegister().getStudent().getFname(),
         p.getRegister().getStudent().getLname(),
         p.getRegister().getStudentClass().getDescription()
         );
       listOfPayments.add(paymentRegisters);
        System.out.println("Payment id: "+ p.getId() + " payment:" + 
         p.getPayment() + " notes: " + p.getNotes()+
         " date of payment: " + p.getDateOfPayment() + " fname: "+
         p.getRegister().getStudent().getFname() + " lname: "+ 
         p.getRegister().getStudent().getLname() + " class: " +
         p.getRegister().getStudentClass().getDescription());
      }
     return listOfPayments;
  } 

  ArrayList<StudentForData> buildStudents(Iterable<Student> students) {
     int count = 0;
      ArrayList<StudentForData> listOfStudents 
       = new ArrayList<StudentForData>();
      for(Student s : students){
       count++;
        StudentForData studentForData = new StudentForData(
         count,
         s.getFname(),
         s.getLname(),
         s.getEmail(),
         s.getPhone(),
         s.getFacebook(),
         s.getDateOfBirth()
         );
       listOfStudents.add(studentForData);
      }
     return listOfStudents;
  }

  @RequestMapping(method=RequestMethod.GET)
  public @ResponseBody Data data(
    @RequestParam(value="name", required=false, defaultValue="Stranger") 
    String name) {
    Iterable<Student> allStudents = this.students.findAll();
    Iterable<Register> allRegistrations = this.registers.findAll();
    Iterable<StudentClass> allClasses = this.studentClass.findAll();
    Iterable<Payed> allPayments = this.payments.findAll();

    System.out.println("Found all students:"+this.students.count());

    System.out.println("Found all registrations:"+this.registers.count());

    System.out.println("Found all classes"+this.studentClass.count());

    System.out.println("Found all payments:"+this.payments.count());
    
    ArrayList<StudentForData> listOfStudents = buildStudents(allStudents);

    ArrayList<RegisterForDataRegisters> listOfRegistrations = buildRegister(allRegistrations);

    ArrayList<StudentClassForDataRegisters> listOfClasses = buildClasses(allClasses);

    ArrayList<PaymentRegisters> listOfPayments = buildPayments(allRegistrations, this.payments);

    return new Data(listOfStudents, listOfRegistrations, listOfClasses, listOfPayments);
  }

}