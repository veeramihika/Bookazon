package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	UserService r;
	@RequestMapping(method = RequestMethod.GET, path ="/get")
	
		public List<User> hi() {
		System.out.print("hi");
		return r.findall();
	}
	@RequestMapping(method=RequestMethod.POST, path="/verification")
	
	public String verify(@RequestParam("email")String email, String password ) {
		//System.out.print(email+" "+password);
		if(r.isverified(email, password)!=null) {
			System.out.print(r.findbyem(email));
		return "pass"+r.findbyem(email);
		}
		else {
			
			return "fail";
		}
	}
	@RequestMapping("/signup")
	public String signup(User user) {
		r.saver(user);
		return "insert successfull";
	}
	@RequestMapping("/details")
	public List<User> userdetails(@RequestParam("number") String number) {
		
		
		return r.findbynumber(number);
		
	}
	
	
	
}
