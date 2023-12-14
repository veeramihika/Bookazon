package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.User;



public interface UserRepo extends JpaRepository<User, Integer> {

	@Query("Select u from User u where u.email= :username and u.password= :password")
	User findbyusernameandpsw(@Param("username") String username,@Param("password")String password);

	@Query("Select u.mobile from User u where u.email= :email")
	public String findbyemail(String email);

	User findByemail(String email);
	
	@Query("from User where reset_token=?1")
	User findByReset_token(String token);

	@Query("from User where mobile=?1")
	List<User> findBynumber(String number);

	@Query("select u.email from User u where u.mobile=:customer_contact")
	String findemailbynumber(String customer_contact);

}
