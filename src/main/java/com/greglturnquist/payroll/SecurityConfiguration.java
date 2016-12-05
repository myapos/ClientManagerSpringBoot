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
import org.springframework.context.annotation.*;
//import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
/**
 * @author Greg Turnquist
 */
// tag::code[]
//@EnableWebMvc
//@ComponentScan("org.springframework.security.samples.mvc")
@Configuration
@EnableWebSecurity
//@EnableWebMvcSecurity
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private SpringDataJpaUserDetailsService userDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(this.userDetailsService)
				.passwordEncoder(Manager.PASSWORD_ENCODER);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
			http
			.addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class)
	        // .authorizeRequests()
	        //   .antMatchers("/index.html", "/login.html", "/").permitAll()
	        //   .anyRequest().authenticated()
			.authorizeRequests()
				.antMatchers("/built/**", "resources/**", "/main.css","/js/**").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
			.loginPage("/login")
			.defaultSuccessUrl("/index.html")
			.failureUrl("/login?error")
			.permitAll()
			.and()
			.logout()
			.permitAll()
			// .authorizeRequests()
				// .antMatchers("/built/**", "/main.css").permitAll()
				// .anyRequest().authenticated()
				// .and()
				// .formLogin().
				// loginPage("/login").
				// loginProcessingUrl("/index").
    //             usernameParameter("username").
    //             passwordParameter("password").
    //             defaultSuccessUrl("/index").	
				// and().logout().    //logout configuration
				// logoutUrl("/"). 
				// logoutSuccessUrl("/login").
				// permitAll()
    //             .loginPage("/login")
    //             .permitAll()
    //             .and()
    //             .logout()
				// .permitAll()
				// .logoutSuccessUrl("/");
            // .logout()                                    
            //     .permitAll()
			// .formLogin()
			// 	.defaultSuccessUrl("/", true)
			// 	.permitAll()
				 .and()
			.httpBasic()
				.and()
			.csrf().disable();

	}

}
// end::code[]


// loginPage("/app/login").
  //               loginProcessingUrl("/appLogin").
  //               usernameParameter("app_username").
  //               passwordParameter("app_password").
  //               defaultSuccessUrl("/app/secure/studentDetail").	
		// and().logout().    //logout configuration
		// logoutUrl("/appLogout"). 
		// logoutSuccessUrl("/app/login");