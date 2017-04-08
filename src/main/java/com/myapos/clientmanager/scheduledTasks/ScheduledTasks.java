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
import com.myapos.clientmanager.controllers.NotificationService;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	private final StudentRepository students;
	private final ManagerRepository managers;
	private final PayedRepository payeds;


	//private Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

	@Autowired
	private NotificationService notificationService;



	@Autowired
	public ScheduledTasks(StudentRepository studentRepository,
						  ManagerRepository managerRepository,
						  PayedRepository payedRepository) {

		this.students = studentRepository;
		this.managers = managerRepository;
		this.payeds = payedRepository;
	}

    @Scheduled(fixedRate = 18000000)
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));

        SecurityContextHolder.getContext().setAuthentication(
			new UsernamePasswordAuthenticationToken("myapos", "doesn't matter",
				AuthorityUtils.createAuthorityList("ROLE_MANAGER")));


        Iterable<Student> allStudents = this.students.findAll();

		//int size = sizeOfIterableStudent(allStudents);

		//System.out.println("size of allStudents:"+size);

		//I want to find all students who haven't payed their registration for the student class.

		//Steps

		//1. find all payments with false
		Iterable<Payed> allPayeds = this.payeds.findAll();
		//uncomment next line for cron scheduling email sending
		int size = sizeOfIterablePayed(allPayeds); //deactivate for the time moment!!!!!

		//2. find all register that matches false payments

		//3. find student id

		//3.1. get student email for these payments

		//3.2 get student class description

		//4. send email to them

    }

    int sizeOfIterablePayed(Iterable<Payed> payeds) {

		int size = 0;

		for(Payed p : payeds){
			//log.info("Found Student data:", s.toString());
			if(!p.getPayment()){
				System.out.println("Found payment data:"
					+ " payment: "+p.getPayment()
					+ " notes:"+p.getNotes()
					+ " dateOfPayment:"+p.getDateOfPayment()
					+ " getDateOfRegistration:"+p.getRegister().getDateOfRegistration()
					+ " fname:"+p.getRegister().getStudent().getFname()
					+ " lname:"+p.getRegister().getStudent().getLname()
					+ " email:"+p.getRegister().getStudent().getEmail()
					+ " phone:"+p.getRegister().getStudent().getPhone()
					+ " facebook:"+p.getRegister().getStudent().getFacebook()
					+ " dateOfBirth:"+p.getRegister().getStudent().getDateOfBirth()
					+ " class:"+p.getRegister().getStudentClass().getDescription()								
					);
				String text = "You are receiving this because you are a member of Ferrum Gym.";
				String msg = "Hello "+p.getRegister().getStudent().getFname()+ " "
				+p.getRegister().getStudent().getLname()+"."
				+text
				+"Please check your payment in the ferrum gym for class "
				+p.getRegister().getStudentClass().getDescription()+ ". "
				+"Your last payment was at "
				+p.getDateOfPayment();
				
				String mode = "auto_sending";
				// send a notification
				try {
					notificationService.sendNotification( 
					  p.getRegister().getStudent().getFname(),
					  p.getRegister().getStudent().getLname(),
					  p.getRegister().getStudent().getEmail(),
					  msg,
					  mode);
				}catch( Exception e ){
					// catch error
					log.info("Error Sending Email: " + e.getMessage());
				}
				// System.out.println("Found payment data:"+p.getPayment()
				// 	+" "+p.getNotes()+" "+p.getDateOfPayment+ " "+p.getRegister().toString);
				size++;
			}
		}

		return size;

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