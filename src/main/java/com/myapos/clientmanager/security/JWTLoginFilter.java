package com.myapos.clientmanager.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import java.util.*;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    public JWTLoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException, ServletException {
                // System.out.println("req password !!!!!!!: "+req.getParameter("username")+
                //     "req object !!!!!!!: "+req.getParameter("password"));

                // Enumeration headerNames = req.getHeaderNames();
                // while(headerNames.hasMoreElements()) {
                //   String headerName = (String)headerNames.nextElement();
                //   System.out.println("Header Name - " + headerName + ", Value - " + req.getHeader(headerName));
                // }

                // Enumeration params = req.getParameterNames(); 
                // while(params.hasMoreElements()){
                //  String paramName = (String)params.nextElement();
                //  System.out.println("Parameter Name - "+paramName+", Value - "+req.getParameter(paramName));
                // }

        String json = "{ \"username\" : \""+req.getParameter("username")+"\", \"password\" : \""+req.getParameter("password")+"\" }";

        AccountCredentials creds = new ObjectMapper()
                .readValue(json, AccountCredentials.class);
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        creds.getUsername(),
                        creds.getPassword(),
                        Collections.emptyList()
                )
        );
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res, FilterChain chain,
            Authentication auth) throws IOException, ServletException {
        TokenAuthenticationService
                .addAuthentication(res, auth.getName());
        chain.doFilter(req,res);        
    }
}