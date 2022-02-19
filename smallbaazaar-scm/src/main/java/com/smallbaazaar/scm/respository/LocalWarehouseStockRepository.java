package com.smallbaazaar.scm.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smallbaazaar.scm.entity.LocalWarehouseStock;

public interface LocalWarehouseStockRepository extends JpaRepository<LocalWarehouseStock, Long>{
	
	LocalWarehouseStock findByUserIdAndStockStockId(long userId, long centralWarehouseStockId);

}
