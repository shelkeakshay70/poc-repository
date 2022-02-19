package com.smallbaazaar.scm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smallbaazaar.scm.entity.Cart;
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	List<Cart> findAllCartsByUserId(long userId);


}
