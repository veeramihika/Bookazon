package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {
	
	@Query("from Product p where p.product_name like %:search% ")
	List<Product> filterByname(String search);

	@Query("from Product p where p.author like %:search% ")
	List<Product> filterByauthor(String search);

	@Query("from Product p where p.category like %:search% ")
	List<Product> filterBycategory(String search);
	
	@Query("from Product p where p.mobileno=:seller")
	List<Product> findbysellerno(String seller);
	
	@Query("from Product p where p.product_id=:id")
	Product getByProduct_Id(int id);

	@Query("from Product p where p.product_id in (:products)")
	List<Product> findByProduct_IdIn(List<Integer> products);

	@Query("from Product p where p.isplaced='false'")
	List<Product> findAllByflag();

}
