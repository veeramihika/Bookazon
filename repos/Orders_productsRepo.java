package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Orders;
import com.example.demo.entity.Orders_products;

public interface Orders_productsRepo extends JpaRepository<Orders_products,Integer>{

	
	@Modifying
	@Query("Delete from Orders_products where orders_order_id=:i and products_product_id=:id")
	void deleteproduct(int i, int id);
	
	
}
