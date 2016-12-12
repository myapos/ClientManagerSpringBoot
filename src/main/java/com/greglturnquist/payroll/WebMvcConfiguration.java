package com.greglturnquist.payroll;

import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.core.Ordered;

 @Configuration
 @EnableWebMvc
 @ComponentScan("com.greglturnquist.payroll")
 //@ComponentScan(basePackageClasses = { WebMvcConfiguration.class })
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	  registry.addResourceHandler("/static/**")
	    .addResourceLocations("classpath:/static/");
	  registry.addResourceHandler("/css/**")
	    .addResourceLocations("/static/css/");
	  registry.addResourceHandler("/media/**")
	    .addResourceLocations("/static/media/");
	  registry.addResourceHandler("/js/**")
	    .addResourceLocations("/static/js/");
	}



}

