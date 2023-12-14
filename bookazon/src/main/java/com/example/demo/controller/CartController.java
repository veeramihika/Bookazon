package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Product;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
	@Autowired
	CartService css;
	@Autowired
	ProductService psss;
	
	@RequestMapping("/addcart")
	public void addtocart(Cart cart) {
		css.addtocart(cart);
	}
	
	@RequestMapping("/viewcart")
	public List<Product> viewall( String seller){
		List<Integer>li=css.mycartitems(seller);
		List<Product> pi=new ArrayList<Product>();
		 for(int i=0;i<li.size();i++) {
			int id=li.get(i);
			pi.add(psss.getit(id));
		 }
		return pi;
	}
	@RequestMapping("/delcart/{id}")
	public List<Product> deletefromcart(@PathVariable int id,String seller) {
		css.deletefromcart(id,seller);
		return viewall(seller);
	}
	@RequestMapping("/getcartcount")
	public int getcount( String seller) {
		
		List<Integer> li=css.mycartitems(seller);
		 return li.size();
	}
	@RequestMapping("/getproductids")
	public List<Integer> productids( String mobile_number){
		//System.out.print(mobile_number);
		return css.mycartitems(mobile_number);
	}

	
}
