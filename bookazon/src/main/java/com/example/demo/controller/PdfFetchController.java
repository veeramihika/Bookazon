package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.PdfFetchService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PdfFetchController {
@Autowired
PdfFetchService pfs;


@RequestMapping("/fetchpdf/{id}")
public String pdffetch(@PathVariable int id) {
	
	return "http://127.0.0.1:8887"+pfs.pdffetcher(id);
}
	
}
