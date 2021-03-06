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
package com.myapos.clientmanager.config;

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
import com.myapos.clientmanager.service.SpringDataJpaUserDetailsService;

import com.myapos.clientmanager.model.*;

import org.springframework.security.web.session.*;
import org.springframework.security.config.http.SessionCreationPolicy;

import com.myapos.clientmanager.security.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
/**
 * @author Myron Apostolakis
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
     .csrf().disable()
     //.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint).and()
     .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
     .authorizeRequests()
         .antMatchers(HttpMethod.POST, "/login").permitAll()
         .antMatchers("/static/**","/static/css/**","/static/media/**").permitAll()
         // .antMatchers(HttpMethod.GET, "/success").authenticated()
         // .antMatchers("/api/authenticate").permitAll()
         // .antMatchers("/api/user").permitAll()
         // .antMatchers("/").permitAll()
         // .antMatchers("/favicon.ico").permitAll()
         .anyRequest().authenticated()
     .and()
         .formLogin()
         .loginPage("/loginPage")
        //  .successHandler(new AuthenticationSuccessHandler() {
        //     @Override
        //     public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        //             Authentication authentication) throws IOException, ServletException {
        //         response.sendRedirect("/success");
        //     }
        // })
         .defaultSuccessUrl("/success")
         //.loginProcessingUrl("/loginPage")
         .failureUrl("/loginPage?error")
         .permitAll()
         // .failureHandler(ajaxAuthenticationFailureHandler)
         // .usernameParameter("username")
         // .passwordParameter("password")
     .and()
         .logout()
         .logoutUrl("/loginPage?logout")
         .permitAll();
         // .logoutSuccessHandler(ajaxLogoutSuccessHandler)
         // .invalidateHttpSession(true)
         // .deleteCookies("JSESSIONID");

      http.addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
              UsernamePasswordAuthenticationFilter.class);

      http.addFilterBefore(new JWTAuthenticationFilter(),
              UsernamePasswordAuthenticationFilter.class);

    // http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
    // http.headers().cacheControl();




      // http
      // .addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class)
      // // We filter the api/login requests
      // .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
      //         UsernamePasswordAuthenticationFilter.class)
      // // And filter other requests to check the presence of JWT in header
      // .addFilterBefore(new JWTAuthenticationFilter(),
      //         UsernamePasswordAuthenticationFilter.class)
      // .authorizeRequests()
      // .antMatchers(HttpMethod.POST, "/login").permitAll()
      // .antMatchers("/static/**","/static/css/**","/static/media/**").permitAll()
      // .anyRequest().authenticated()
      // .and()
      // .formLogin()
      // .defaultSuccessUrl("/", true)
      // .loginPage("/loginPage")
      // .failureUrl("/loginPage?error")
      // .permitAll()
      // .and()
      // .logout()
      // .permitAll()
      // .and()
      // .httpBasic()
      // .and()
      // .csrf().disable();
      
    }

}
