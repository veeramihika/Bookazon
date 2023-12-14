package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int order_id;
	int order_amount;
	String delivery_address;
	String customer_contact;
	
	@ManyToMany
	List<Product> products;
//	int product_id;
//	
//	public int getProduct_id() {
//		return product_id;
//	}
//	public void setProduct_id(int product_id) {
//		this.product_id = product_id;
//	}
	public int getOrder_amount() {
		return order_amount;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public void setOrder_amount(int order_amount) {
		this.order_amount = order_amount;
	}
	public String getDelivery_address() {
		return delivery_address;
	}
	public void setDelivery_address(String delivery_address) {
		this.delivery_address = delivery_address;
	}
	public String getCustomer_contact() {
		return customer_contact;
	}
	public void setCustomer_contact(String customer_contact) {
		this.customer_contact = customer_contact;
	}
	

	@Override
	public String toString() {
		return "Order_ [order_id=" + order_id + ", order_amount=" + order_amount + ", delivery_address="
				+ delivery_address + ", customer_contact=" + customer_contact + "]";
	}
	
}
