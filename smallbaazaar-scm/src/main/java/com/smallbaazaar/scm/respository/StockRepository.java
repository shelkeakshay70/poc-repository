package com.smallbaazaar.scm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smallbaazaar.scm.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
	
	List<Stock> findAllStockByProductProductId(long productId);

}
