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

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.*;



/**
 * @author Myron Apostolakis
 */
// tag::code[]

public class RegisterForDataRegisters {

	private int index;
	private Date dateOfRegistration;
	private String fname;
	private String lname;
	private String email;
	private String phone;
	private String facebook;
	private String classDescription;

	public RegisterForDataRegisters(
		int index,
		Date dateOfRegistration, 
		String fname, 
		String lname,
		String email,
		String phone,
		String facebook, 
		String classDescription) {
		this.index = index;
		this.dateOfRegistration = dateOfRegistration;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.phone = phone;
		this.facebook = facebook;
		this.classDescription = classDescription;
	}

	public int getIndex() {
	  return index;
	}

	public Date getDateOfRegistration() {
	  return dateOfRegistration;
	}

	public String getFname() {
	  return fname;
	}

	public String getLname() {
	  return lname;
	}

	public String getEmail() {
	  return email;
	}

	public String getPhone() {
	  return phone;
	}

	public String getFacebook() {
	  return facebook;
	}

	public String getClassDescription() {
	  return classDescription;
	}

}