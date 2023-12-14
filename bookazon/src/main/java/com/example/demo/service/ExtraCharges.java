package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class ExtraCharges {
	
	public double getGstAmount(int price) {
		
		double GstAmount=price*(0.12);
		
		return GstAmount;
	}
	


}
