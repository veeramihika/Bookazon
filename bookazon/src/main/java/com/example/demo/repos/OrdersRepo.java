package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Orders;

public interface OrdersRepo extends JpaRepository<Orders,Integer>{
	
@Query("from Orders o where o.customer_contact=:mobile_number")
	List<Orders> findBycustomer_contact(String mobile_number);
@Query("from Orders o where o.order_id=:id")
	Orders findByorder_id(int id);


}
