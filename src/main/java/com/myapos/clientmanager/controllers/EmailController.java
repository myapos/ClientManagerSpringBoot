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
import org.springframework.web.bind.annotation.ResponseBody;
import com.myapos.clientmanager.model.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @author Myron Apostolakis
 */
@Controller
public class EmailController {
	
	private Logger logger = LoggerFactory.getLogger(EmailController.class);
	
	@Autowired
	private NotificationService notificationService;
	
	@RequestMapping(value = "/email",params = { "fname", "lname","email","msg" },method = RequestMethod.GET)
    @ResponseBody
	public String signupSuccess(
		 @RequestParam String fname,  @RequestParam String lname, 
		 @RequestParam String email, @RequestParam String msg){
				
		// send a notification
		try {
			notificationService.sendNotification( fname,  lname,  email,  msg);
		}catch( Exception e ){
			// catch error
			logger.info("Error Sending Email: " + e.getMessage());
		}
		
		return "Thank you for registering with us.";
	}
	
}
// end::code[]