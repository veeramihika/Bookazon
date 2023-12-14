package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repos.InvoicesRepo;
import com.example.demo.repos.Orders_productsRepo;

@Service
public class PdfFetchService {
	@Autowired
	InvoicesRepo Ir;
	
	@Autowired
	Orders_productsRepo opr;

	public String pdffetcher(int product_id) {
		
		int order_id= opr.getorderid(product_id);
		return Ir.findByOrder_idandCustomer_contact(order_id);
	}
	public String pdfdeleter(int product_id) {
		
		int order_id= opr.getorderid(product_id);
		Ir.DeleteByOrder_idandCustomer_contact(order_id);
		return "delete successfull";
	}
}
