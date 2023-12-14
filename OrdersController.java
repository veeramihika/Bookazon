package com.example.demo.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.service.CartService;
import com.example.demo.service.OrdersService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {
	@Autowired
	OrdersService os;
	@Autowired
	CartService cartService;
	@Autowired
	EmailController ec;
	@Autowired
	UserService us;
	@Autowired
	ProductService productService;
@RequestMapping("/placeorder")
public void placeorder(@RequestParam String delivery_address,@RequestParam String customer_contact,@RequestParam int order_amount,@RequestParam List<Integer> products) throws UnsupportedEncodingException, MessagingException {

	os.placeOrder(delivery_address, customer_contact, order_amount,products);
	for(int i=0;i<products.size();i++) {
		cartService.deletefromcart(products.get(i), customer_contact);
	}
	ec.sendproductviamail(us.findmailbynumber(customer_contact),order_amount,delivery_address);
	

}

@RequestMapping("/myorders")
public List<Product> myoders(@RequestParam String customer_contact){
	return os.getallorders(customer_contact);
}
@RequestMapping("/cancelorder")
public List<Product> cancelorder(@RequestParam int id,@RequestParam String mobile_number) {
	
	 os.cancelorder(id,mobile_number);
	 return os.getallorders(mobile_number);
}

}

