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
import com.myapos.clientmanager.model.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;

import java.util.*;

/**
 * @author Myron Apostolakis
 */
@Controller
@RequestMapping("/getDataRegisters")
public class getDataRegistersController {
  private static final String template = "Hello, %s!";
  private final AtomicLong counter = new AtomicLong();

  private final StudentRepository students;
  private final RegisterRepository registers;
  private final StudentClassRepository studentClass;

  @Autowired
  public getDataRegistersController(StudentRepository studentRepository,
      RegisterRepository registerRepository, StudentClassRepository studentClassRepository) {
    this.students = studentRepository;
    this.registers = registerRepository;
    this.studentClass = studentClassRepository;
  }

  int sizeOfStudent(Iterable<Student> students) {

    int size = 0;

    for(Student s : students){
        //Do whatever you want
        size++;
        System.out.println("id: "+ s.getId() + " fname: "+s.getFname());
    }
    return size;

  }
  int sizeOfRegister(Iterable<Register> registers) {

     int size = 0;

     for(Register r : registers){
         //Do whatever you want
         size++;
     }
     return size;

  }
  ArrayList<StudentClassForDataRegisters> sizeOfClasses(Iterable<StudentClass> studentClasses) {

     int size = 0;

     ArrayList<StudentClassForDataRegisters> listOfStudentClasses 
      = new ArrayList<StudentClassForDataRegisters>();
     //StudentClassForDataRegisters
     for(StudentClass s : studentClasses){
      StudentClassForDataRegisters studentClassForDataRegisters = new StudentClassForDataRegisters(s.getDescription());
      listOfStudentClasses.add(studentClassForDataRegisters);
       System.out.println("id: "+ s.getId() + " description: "+s.getDescription()
        +" get parent class:" + s.getStudentClass().getDescription());
        //Do whatever you want
        
        size++;

     }
     return listOfStudentClasses;
  } 

  @RequestMapping(method=RequestMethod.GET)
  public @ResponseBody DataRegisters dataRegisters(@RequestParam(value="name", required=false, defaultValue="Stranger") String name) {
    Iterable<Student> allStudents = this.students.findAll();
    Iterable<Register> allRegistrations = this.registers.findAll();
    Iterable<StudentClass> allClasses = this.studentClass.findAll();

    int numOfStudents = sizeOfStudent(allStudents);

    System.out.println("brika olous tous ma8ites:"+numOfStudents);

    int numOfRegistrations = sizeOfRegister(allRegistrations);

    System.out.println("brika oles tis eggrafes:"+numOfRegistrations);

    /*int numOfClasses = sizeOfClasses(allClasses);

    System.out.println("brika ola ta tmimata:"+numOfClasses);*/

    ArrayList<StudentClassForDataRegisters> listOfClasses = sizeOfClasses(allClasses);

    return new DataRegisters(allStudents, allRegistrations, listOfClasses);
  }

}