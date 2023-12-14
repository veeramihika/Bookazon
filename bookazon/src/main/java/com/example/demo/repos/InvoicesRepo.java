package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Invoices;

public interface InvoicesRepo extends JpaRepository<Invoices,Integer> {

	@Query("SELECT i.filepath FROM Invoices i WHERE i.order_id=:order_id")
	String  findByOrder_idandCustomer_contact(int order_id);
	
	@Modifying
	@Query("DELETE FROM Invoices i WHERE i.order_id=:order_id")
	void  DeleteByOrder_idandCustomer_contact(int order_id);

}
