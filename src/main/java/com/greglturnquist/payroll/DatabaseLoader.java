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
package com.greglturnquist.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final StudentRepository students;
	private final ManagerRepository managers;

	@Autowired
	public DatabaseLoader(StudentRepository studentRepository,
						  ManagerRepository managerRepository) {

		this.students = studentRepository;
		this.managers = managerRepository;
	}

	@Override
	public void run(String... strings) throws Exception {

		// String result = "<html>";
		
		// for(Student stud : this.studentRepository.findAll()){
		// 	result += "<div>" + stud.toString() + "</div>";
		// }
		
		// return result + "</html>";

		//this.managers.findByName("myapos");

		// Manager greg = this.managers.save(new Manager("greg", "turnquist",
		// 					"ROLE_MANAGER"));
		// Manager myapos = this.managers.save(new Manager("myapos", "Apostolakis1981",
		// 					"ROLE_MANAGER"));
		// Manager oliver = this.managers.save(new Manager("oliver", "gierke",
		// 					"ROLE_MANAGER"));

		Manager greg = this.managers.findByName("greg");
		Manager myapos = this.managers.findByName("myapos");

		System.out.println("manager: "+myapos);
		System.out.println("manager: "+greg);

		SecurityContextHolder.getContext().setAuthentication(
			new UsernamePasswordAuthenticationToken("greg", "doesn't matter",
				AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

		SecurityContextHolder.getContext().setAuthentication(
			new UsernamePasswordAuthenticationToken("myapos", "doesn't matter",
				AuthorityUtils.createAuthorityList("ROLE_MANAGER")));


		// this.students.save(new Student("myros","myroslname","myapos@yahoo.com","6979791029","https://www.facebook.com/myapos", myapos));
		// this.students.save(new Student("myros2","myroslname2","myapos2@yahoo.com","6979791029","https://www.facebook.com/myapos2", myapos));



		//SecurityContextHolder.clearContext();
	}
}
// end::code[]