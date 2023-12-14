package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repos.UserRepo;

@Service
public class UserService {
	@Autowired
	UserRepo u;
	 
	public List<User> findall(){
		return u.findAll();
	}
	
	public User isverified(String username,String password) {
		return u.findbyusernameandpsw(username,password);
	}

	public void saver(User user) {
		u.save(user);
		
	}

	public String findbyem(String email) {
		return u.findbyemail(email);
		
	}

	public List<User> findbynumber(String number) {
		return u.findBynumber(number);
		
	}

	public String findmailbynumber(String customer_contact) {
		
		return u.findemailbynumber(customer_contact);
	}

}
