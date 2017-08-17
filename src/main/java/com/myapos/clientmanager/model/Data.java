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

public class Data {

	private final ArrayList<StudentForData> listOfStudents;
	private final ArrayList<RegisterForDataRegisters> listOfRegistrations;
	private final ArrayList<StudentClassForDataRegisters> listOfStudentClasses;
	private final ArrayList<PaymentRegisters> listOfPayments;

	//private final Iterable<StudentClass> allClasses;
 //, Iterable<StudentClass> studentClasses
	public Data(ArrayList<StudentForData> listOfStudents,
	 ArrayList<RegisterForDataRegisters> listOfRegistrations, 
	 ArrayList<StudentClassForDataRegisters> listOfStudentClasses,
	 ArrayList<PaymentRegisters> listOfPayments
	 ) {
	   this.listOfStudents = listOfStudents;
	   this.listOfRegistrations = listOfRegistrations;
	   this.listOfStudentClasses = listOfStudentClasses;
	   this.listOfPayments = listOfPayments;
	}

	public Iterable<StudentForData> getListOfStudents() {
	  return listOfStudents;
	}

	public ArrayList<RegisterForDataRegisters>  getListOfRegistrations() {
	  return listOfRegistrations;
	}
	public ArrayList<StudentClassForDataRegisters> getListOfStudentClasses() {
	  return listOfStudentClasses;
	}

	public ArrayList<PaymentRegisters> getListOfPayments() {
	  return listOfPayments;
	}
}
