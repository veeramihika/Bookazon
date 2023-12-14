package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Product;
import com.example.demo.repos.CartRepo;
import com.example.demo.service.ProductService;


@SuppressWarnings("unused")
@Service
public class CartService {
	@Autowired
	CartRepo crr;


	
	public void addtocart(Cart cart) {
		crr.save(cart);
	}
	public void deletefromcart(int id, String seller) {
		
		crr.deleteById(crr.findCartid(id,seller));
		
	}
	//list of carts with same phone number
	 public List<Integer> mycartitems(String sellerno){
		 List<Integer>li= crr.getallbysellerno(sellerno);
		

		 return li;
	 }

	
}
