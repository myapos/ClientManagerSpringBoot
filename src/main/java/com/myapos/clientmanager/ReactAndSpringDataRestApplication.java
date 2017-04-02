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
package com.myapos.clientmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableAsync;
import java.util.concurrent.*;
import org.springframework.scheduling.concurrent.*;
import org.springframework.context.annotation.*;
import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.context.annotation.EnableScheduling;

//------------------------------------------------------------------

//import org.springframework.context.annotation.Bean;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
/**
 * @author Myron Apostolakis
 */
// tag::code[]
@SpringBootApplication
@EnableAsync
@EnableScheduling
public class ReactAndSpringDataRestApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(ReactAndSpringDataRestApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ReactAndSpringDataRestApplication.class);
	}

	@Bean(name="threadPoolTaskExecutor")
    public Executor threadPoolTaskExecutor() {
        return new ThreadPoolTaskExecutor();
    }

	// @Bean
 //    public WebMvcConfigurer corsConfigurer() {
 //        return new WebMvcConfigurerAdapter() {
 //            @Override
 //            public void addCorsMappings(CorsRegistry registry) {
 //                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
 //            }
 //        };
 //    }


}
// end::code[]