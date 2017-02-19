package com.myapos.clientmanager.scheduledTasks;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.util.*;
import java.text.*;
import com.myapos.clientmanager.model.*;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	private final StudentRepository students;
	private final ManagerRepository managers;
	@Autowired
	public ScheduledTasks(StudentRepository studentRepository,
						  ManagerRepository managerRepository) {

		this.students = studentRepository;
		this.managers = managerRepository;
	}

    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));

        SecurityContextHolder.getContext().setAuthentication(
			new UsernamePasswordAuthenticationToken("myapos", "doesn't matter",
				AuthorityUtils.createAuthorityList("ROLE_MANAGER")));


        Iterable<Student> allStudents = this.students.findAll();

		int size = sizeOfIterableStudent(allStudents);

		System.out.println("size of allStudents:"+size);

		//I want to find all students who haven't payed their registration for the student class.
		//Steps
    }

    	int sizeOfIterableStudent(Iterable<Student> students) {

		int size = 0;

		for(Student s : students){
			//log.info("Found Student data:", s.toString());
			//System.out.println("Found Student data::"+s.toString());
			System.out.println("Found Student data:"
				+s.getFname()+" "+
				s.getLname()+" "+
			    s.getEmail()+ " "+
			    s.getPhone()+ " "+
			    s.getFacebook()+ " "+
			    s.getDateOfBirth()
				);
		    //Do whatever you want
		    //System.out.println("metraw");
		    size++;
		}
		return size;

	}

}