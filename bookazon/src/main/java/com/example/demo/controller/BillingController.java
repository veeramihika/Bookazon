package com.example.demo.controller;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Orders;
import com.example.demo.service.PdfGenService;

@RestController
public class BillingController {

	@Autowired
	PdfGenService pf;
	
	@RequestMapping("/download")
	public File downloader(Orders op) throws Exception {
		
		
		return pf.generatebill(op);
	}
	
}