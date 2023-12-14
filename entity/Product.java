package com.example.demo.entity;

import java.util.Arrays;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;



@Entity
public class Product {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private int product_id;
private String product_name;
private int price;
private String category;
private String description;
private String nameofseller;
private String mobileno;
private String author;
private byte[] picture;
private String isplaced;


//@ManyToMany(mappedBy="products")
//List<Orders> orders;


public String isIsplaced() {
	return isplaced;
}
public void setIsplaced(String isplaced) {
	this.isplaced = isplaced;
}
public Product() {
	super();
	
}
public int getProduct_id() {
	return product_id;
}
public void setProduct_id(int product_id) {
	this.product_id = product_id;
}
public String getProduct_name() {
	return product_name;
}
public void setProduct_name(String product_name) {
	this.product_name = product_name;
}
public int getPrice() {
	return price;
}
public void setPrice(int price) {
	this.price = price;
}
public String getCategory() {
	return category;
}
public void setCategory(String category) {
	this.category = category;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public String getNameofseller() {
	return nameofseller;
}
public void setNameofseller(String nameofseller) {
	this.nameofseller = nameofseller;
}
public String getMobileno() {
	return mobileno;
}
public void setMobileno(String mobileno) {
	this.mobileno = mobileno;
}
public byte[] getPicture() {
	return picture;
}
public void setPicture(byte[] picture) {
	this.picture = picture;
}

public String getAuthor() {
	return author;
}
public void setAuthor(String author) {
	this.author = author;
}
@Override
public String toString() {
	return "Product [product_id=" + product_id + ", product_name=" + product_name + ", price=" + price + ", category="
			+ category + ", description=" + description + ", nameofseller=" + nameofseller + ", mobileno=" + mobileno
			+ ", author=" + author + ", picture=" + Arrays.toString(picture) + ", isplaced=" + isplaced + "]";
}





}
