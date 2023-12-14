package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.repos.OrdersRepo;
import com.example.demo.repos.Orders_productsRepo;
import com.example.demo.repos.ProductRepo;

@Transactional
@Service
public class OrdersService {

	@Autowired
	OrdersRepo ordersRepo;
	@Autowired
	ProductRepo productRepo;
	@Autowired
	Orders_productsRepo opr;
	@Autowired
	PdfFetchService pfs;
	@Autowired
	PdfGenService pdfgen;
	
	public Orders placeOrder(String delivery_address,String customer_contact,int order_amount,List<Integer> products) {
		

			Orders orders=new Orders();
			orders.setCustomer_contact(customer_contact);
			orders.setDelivery_address(delivery_address);
			orders.setOrder_amount(order_amount);
			List<Product> items = productRepo.findByProduct_IdIn(products);
			for(Product p:items) {
				p.setIsplaced("true");
				productRepo.save(p);
			}
			

			orders.setProducts(items);
			
		ordersRepo.save(orders);
		
		return orders;
		
	}
	
	
	
	public List<Product> getallorders(String mobile_number){
		
		List<Orders> orders=ordersRepo.findBycustomer_contact(mobile_number);
		List<Product> products=new ArrayList<>();
		for(int i=0;i<orders.size();i++) {
			products.addAll(orders.get(i).getProducts());
			
		}
		
		return products;
	}
	
	
	
	
	public void cancelorder(int id,String mobile_number) throws Exception {

		pfs.pdfdeleter(id);
		Orders orders=ordersRepo.findByorder_id(opr.getorderid(id));
		Product product=productRepo.getByProduct_Id(id);
		int amount =product.getPrice();
		opr.deleteproduct(orders.getOrder_id(), id);
		if(orders.getOrder_amount()-amount > 1) {
		orders.setOrder_amount(orders.getOrder_amount()-amount);
		ordersRepo.save(orders);
		pdfgen.generatebill(orders);
		product.setIsplaced("false");
		productRepo.save(product);
		}
		else {
		ordersRepo.delete(orders);
		product.setIsplaced("false");
		productRepo.save(product);
		}

	}
	
}
