package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Orders_products {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int dummy;

	int orders_order_id;
	int products_product_id;
	public int getOrders_order_id() {
		return orders_order_id;
	}
	public void setOrders_order_id(int orders_order_id) {
		this.orders_order_id = orders_order_id;
	}
	public int getProducts_product_id() {
		return products_product_id;
	}
	public void setProducts_product_id(int products_product_id) {
		this.products_product_id = products_product_id;
	}
	@Override
	public String toString() {
		return "Orders_products [orders_order_id=" + orders_order_id + ", products_product_id=" + products_product_id
				+ "]";
	}
	
}
