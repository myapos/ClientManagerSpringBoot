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
import org.springframework.web.bind.annotation.RestController;
import com.myapos.clientmanager.model.*;


import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
/**
 * @author Myron Apostolakis
 */
// tag::code[]


@Service
public class NotificationService {
 
	private JavaMailSender javaMailSender;
	
	@Autowired
	public NotificationService(JavaMailSender javaMailSender){
		this.javaMailSender = javaMailSender;
	}
	
	@Async("threadPoolTaskExecutor")
	public void sendNotification(String fname, String lname, String email, String msg, String mode) throws MailException, InterruptedException {
		
		System.out.println("Sleeping now...");
        Thread.sleep(10000);
		
        System.out.println("Sending email...");
        
        SimpleMailMessage mail = new SimpleMailMessage();
        if( mode.equals("selectedClasses")){
			String text = "You are receiving this because you are a member of Ferrum Gym.";
			mail.setTo(email);
			mail.setFrom("ferrumgym@gmail.com");
			mail.setSubject("Notification ");
			mail.setText(text + msg);
			javaMailSender.send(mail);
			System.out.println("Email Sent!");
		}
		else {
			//String text = "You are receiving this because you are a member of Ferrum Gym.";
			mail.setTo(email);
			mail.setFrom("ferrumgym@gmail.com");
			mail.setSubject("Check your registration fee ");
			mail.setText(msg);
			javaMailSender.send(mail);
			System.out.println("Email Sent!");

		}
	}
	
}