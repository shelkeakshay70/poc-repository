package com.smallbaazaar.scm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smallbaazaar.scm.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	List<Product> findByProductType(String productType);

}
