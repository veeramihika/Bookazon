package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Cart;

public interface CartRepo extends JpaRepository<Cart,Integer> {

	@Query("select c.product_id from Cart c where c.mobile_no=:sellerno")
	List<Integer> getallbysellerno(String sellerno);

	@Query("select c.id from Cart c where c.product_id=:id and c.mobile_no=:seller")
	Integer findCartid(int id, String seller);



}
