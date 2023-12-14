package com.example.demo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	@Autowired
	ProductService p;
	
	@PostMapping(path="/Create")
	public String createproduct(Product product,MultipartFile image)throws IOException {
		
		byte[] imagedata=image.getBytes();

		product.setPicture(imagedata);
		p.Addproduct(product);
		
		return "added";
	}
	@GetMapping(path="/disp/{id}")
	public void disp(@PathVariable int id,HttpServletResponse response)throws IOException,ServletException {
		Product product =p.getByid(id);
		response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
		response.getOutputStream().write(product.getPicture());
		response.getOutputStream().close();
	}
	@GetMapping(path="/getall")
	public List<Product> getall(){
		return p.fetchall();
	}
	
	@PostMapping(path="/search")
	public List<Product> filtered(String filter,String search){
		return p.filterem(filter,search);
	}
	
	@PostMapping(path="/sortby")
	public List<Product> sortby(String sortparam){
		return p.sorter(sortparam);
	}
	@RequestMapping(path="/mybooks")
	public List<Product> getem(String sellerno){

		return p.getembyseller(sellerno);
	}
	@RequestMapping(path="/deleterr/{id}")
	public List<Product> getalli(@PathVariable int id,String sellerno){
		System.out.print(id);
		return p.deleteandgetrest(id,sellerno);
	}
	@RequestMapping(path="/view/{id}")
	public List<Product> getit(@PathVariable int id) {
		List<Product> li=new ArrayList<Product>();
		li.add(p.getit(id));
		return li;
	}
	
	

}
