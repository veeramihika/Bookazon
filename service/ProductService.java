package com.example.demo.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Product;
import com.example.demo.repos.ProductRepo;

@Service
public class ProductService {

	@Autowired
	ProductRepo pr;
	
	public void Addproduct(Product product)throws IOException {
		product.setIsplaced("false");
		pr.save(product);
	}

	public Product getByid(int id) {
		
		return pr.getById(id);
	}

	public List<Product> fetchall() {
		
		return pr.findAllByflag();
	}

	public List<Product> filterem(String filter, String search) {
		if(filter.equals("name")) {
			
		return pr.filterByname(search);
		}
		else if(filter.equals("Author")) {
			return pr.filterByauthor(search);
		}
		else {
			return pr.filterBycategory(search);
		}
	}

	public List<Product> sorter(String sortparam) {
		if(sortparam.equals("ltoh")) {
		return pr.findAll(Sort.by("price"));
		}
		else {
			return pr.findAll(Sort.by("price").descending());
		}
	}
	public List<Product> getembyseller(String seller){
		return pr.findbysellerno(seller);
	}

	public List<Product> deleteandgetrest(int id,String seller) {
		pr.deleteById(id);
		return pr.findbysellerno(seller);
	}

	public Product getit(int id) {
		
		return pr.getByProduct_Id(id);
	}
	
}
