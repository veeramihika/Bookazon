package com.example.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repos.UserRepo;

@Service
public class EmailService {

	@Autowired
	
	UserRepo cus;
	
	    public  void updateResetPasswordToken(String token, String email) {
	        User u = cus.findByemail(email);
	        if (u != null) {
	            u.setReset_token(token);
	            cus.save(u);
	        } 
	    }
	    public User getByResetPasswordToken(String token) {
	        return cus.findByReset_token(token);
	    }
	    public void updatePassword(User u, String newPassword) {

	        
	        u.setPassword(newPassword);
	        u.setReset_token(null);
	        cus.save(u);
	    }
		
	

}
