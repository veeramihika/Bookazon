package com.example.demo.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;

import com.example.demo.entity.Invoices;
import com.example.demo.entity.Orders;
import com.example.demo.repos.InvoicesRepo;
import com.example.demo.repos.OrdersRepo;
import com.example.demo.repos.ProductRepo;


@Service
public class PdfGenService {

	@Autowired
	private PDFGenerationService pdfi;
	@Autowired
	ProductRepo ps;
	
	@Autowired
	
	InvoicesRepo Ir;
	@Autowired
	
	ExtraCharges ec;
	public File generatebill(Orders op) throws Exception {
	String templatepath="success.html";
	HashMap<String,Object> hi=new HashMap<String,Object>();
	hi.put("data",op.getProducts());
	hi.put("delivery_Address",op.getDelivery_address());
	hi.put("total_amount",op.getOrder_amount());
	hi.put("GstAmount",ec.getGstAmount(op.getOrder_amount()) );
	File pdffile=pdfi.createPdf(templatepath,hi,op.getOrder_id(),op.getCustomer_contact());
	String uploadDir = "/invoices"+"/"+pdffile.getName();
	Path uploadPath = Paths.get(uploadDir);
	Files.copy(pdffile.toPath(), uploadPath);
	
	Invoices i =new Invoices();
	i.setCustomer_contact(op.getCustomer_contact());
	i.setFilename(pdffile.getName());
	i.setFilepath(uploadPath.toString());
	i.setOrder_id(op.getOrder_id());
	
	
	try {
		Ir.save(i);
	}
	catch(Exception e) {
		System.out.print(e.getMessage());
	}
	
	
	return pdffile;
	}
	
}
