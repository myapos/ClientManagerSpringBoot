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
package com.myapos.clientmanager.model;

import java.util.*;

/**
 * @author Myron Apostolakis
 */

public class DataRegisters {

	private final Iterable<Student> allStudents;
	private final Iterable<Register> allRegistrations;
	private final ArrayList<StudentClassForDataRegisters> listOfStudentClasses;

	//private final Iterable<StudentClass> allClasses;
 //, Iterable<StudentClass> studentClasses
	public DataRegisters(Iterable<Student> allStudents,
	 Iterable<Register> allRegistrations, ArrayList<StudentClassForDataRegisters> listOfStudentClasses) {
	   this.allStudents = allStudents;
	   this.allRegistrations = allRegistrations;
	   this.listOfStudentClasses = listOfStudentClasses;
	   //this.allClasses = studentClasses;
	}

	public Iterable<Student> getAllStudents() {
	  return allStudents;
	}

	public Iterable<Register> getAllRegistrations() {
	  return allRegistrations;
	}
	public ArrayList<StudentClassForDataRegisters> getlistOfStudentClasses() {
	  return listOfStudentClasses;
	}

}
