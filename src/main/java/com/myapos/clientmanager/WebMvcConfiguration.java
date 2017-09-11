package com.myapos.clientmanager;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.core.Ordered;
import com.myapos.clientmanager.model.*;


 @Configuration
 @EnableWebMvc
 @ComponentScan("com.myapos.clientmanager")
 //@ComponentScan(basePackageClasses = { WebMvcConfiguration.class })
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/loginPage").setViewName("loginPage");
        registry.addViewController("/success").setViewName("success");
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

