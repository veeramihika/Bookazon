package com.example.demo.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repos.ProductRepo;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;

import net.bytebuddy.utility.RandomString;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {
	@Autowired
	JavaMailSender mailSender;

	@Autowired
	ProductRepo ps;
	@Autowired
	UserService us;
	@Autowired
	EmailService cus;
	
	
	public void sendEmail(String recipientEmail, String link)
	        throws MessagingException, UnsupportedEncodingException {
	    MimeMessage message = mailSender.createMimeMessage();              
	    MimeMessageHelper helper = new MimeMessageHelper(message);
	    
	     
	    helper.setFrom("contact@shopme.com", "Bookazon");
	    helper.setTo(recipientEmail);
	     
	    String subject = "Here's the link to reset your password";
	     
	    String content = "<p>Hello,</p>"
	            + "<p>You have requested to reset your password.</p>"
	            + "<p>Click the link below to change your password:</p>"
	            + "<p><a href=\"" + link + "\">Change my password</a></p>"
	            + "<br>"
	            + "<p>Ignore this email if you do remember your password, "
	            + "or you have not made the request.</p>";
	     
	    helper.setSubject(subject);
	     
	    helper.setText(content, true);

	    mailSender.send(message);

	}
	
	
	
	@RequestMapping("/forgot_password")
	@ResponseBody
	public String processForgotPassword(@RequestParam String email) throws UnsupportedEncodingException, MessagingException {
	    
	    String token = RandomString.make(30);

	    	cus.updateResetPasswordToken(token, email);
	        String resetPasswordLink = "http://localhost:3000/passwordupd" + "?token=" + token;
	        sendEmail(email, resetPasswordLink);
	        //model.addAttribute("message", "We have sent a reset password link to your email. Please check.");
	         

	         
	    return "sent";
	}

	/*
	 * @RequestMapping("/reset_forget") public String
	 * showResetPasswordForm(@Param(value = "token") String token, Model model) {
	 * Customere customer = customUserDetailsService.getByResetPasswordToken(token);
	 * model.addAttribute("token", token);
	 * 
	 * if (customer == null) { model.addAttribute("message", "Invalid Token");
	 * return "message"; }
	 * 
	 * return "reset_psw.html"; }
	 */
	
	
	@RequestMapping("/reset_password")
	@ResponseBody
	public String processResetPassword(HttpServletRequest request) {
	    String token = request.getParameter("token");
	    String password = request.getParameter("password");
	    User u = cus.getByResetPasswordToken(token);
	    	cus.updatePassword(u, password);
	    return "You have successfully changed your password.";
	}



	public void sendproductviamail(String recipientEmail,int order_amount,String Address,List<Integer> products)
	        throws MessagingException, IOException {
	    MimeMessage message = mailSender.createMimeMessage();              
	    MimeMessageHelper helper = new MimeMessageHelper(message,true);
	    
	     
	    helper.setFrom("contact@shopme.com", "mihika");
	    helper.setTo(recipientEmail);
	     
	    String subject = "Order has been placed successfully";
	     
	    String content = "<p>Greetings,</p>"
	            + "<p>Your order of cost "+Integer.toString(order_amount)+"rs has been placed successfully and will be delivered to u soon to "
	            +Address+"</p>"
	            + "<p>Thank You,</p>"
	    		+"BOOKAZON";
	     
	    helper.setSubject(subject);
	     
	    helper.setText(content, true);
	    for(int i=0;i<products.size();i++) {
	    	Product p=ps.getByProduct_Id(products.get(i));
	    	byte[] image=p.getPicture();
	    	File attachmentFile = new File(i+".jpg");
	    	OutputStream os = new FileOutputStream(attachmentFile);
	    	os.write(image);
	    	os.close();
	    	helper.addAttachment(i+"", attachmentFile);
	    	
	    }
	    
	    mailSender.send(message);

	}

}


