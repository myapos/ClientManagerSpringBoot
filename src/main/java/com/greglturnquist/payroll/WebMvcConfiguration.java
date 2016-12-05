package com.greglturnquist.payroll;

import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.core.Ordered;

// @EnableWebMvc
// @ComponentScan("org.springframework.security.samples.mvc")
 @Configuration
 @EnableWebMvc
 //@ComponentScan(basePackageClasses = { WebMvcConfiguration.class })
 @ComponentScan("org.springframework.security.samples.mvc")
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

    // ...

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}

