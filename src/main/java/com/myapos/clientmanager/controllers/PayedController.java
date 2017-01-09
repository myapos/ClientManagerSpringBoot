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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.myapos.clientmanager.model.*;


/**
 * @author Myron Apostolakis
 */
// tag::code[]
@Controller
@RequestMapping(value = "/payed")
public class PayedController {

	@Autowired
	PayedRepository PayedRepository;

	// @RequestMapping(method=RequestMethod.GET)
	// public @ResponseBody Payed sayHello(@RequestParam(value="name", required=false, defaultValue="Stranger") String name) {
 //        return new Greeting(counter.incrementAndGet(), String.format(template, name));
 //    }

	// @RequestMapping("/findall")
	// public void findAll(){
	// 	//String result = "<html>";
		
	// 	Iterable<Student> allStudents = this.studentRepository.findAll();
	// 	for(Student s : allStudents){
	// 	    //Do whatever you want
	// 	    System.out.println(s);
	// 	    //size++;
	// 	}
	// 	// for(Student stud : studentRepository.findAll()){
	// 	// 	result += "<div>" + stud.toString() + "</div>";
	// 	// }
		
	// 	//return result + "</html>";
	// }



}
// end::code[]