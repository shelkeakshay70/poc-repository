package com.smallbaazaar.scm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smallbaazaar.scm.entity.LocalWarehouseStock;
import com.smallbaazaar.scm.service.LocalWarehouseStockService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class LocalWarehouseStockRestController {
	
	@Autowired
	LocalWarehouseStockService localWarehouseStockService;
	
	@GetMapping("/local-stocks/{userId}/{centralWarehouseStockId}")
	LocalWarehouseStock getLocalStockByCentralStockId(@PathVariable("userId") long localWareUserId, @PathVariable("centralWarehouseStockId") long centralWarehouseStockId) {
		
		return localWarehouseStockService.getLocalStockByCentralId(localWareUserId,centralWarehouseStockId);
	}
	
	@GetMapping("/local-stocks/availabilty/{pincode}/{stockId}/{quantity}")
	String checkStockAvailabilityAtLocalWare(@PathVariable("pincode") int pincode, @PathVariable("stockId") long stockId,@PathVariable("quantity") int quantity) {
		
		return localWarehouseStockService.checkStockAvailabilityAtLocalWare(pincode, stockId, quantity);
	}
	
	@PutMapping("/local-stocks")
	LocalWarehouseStock updateLocalStock(@RequestBody LocalWarehouseStock localWarehouseStock) {
		
		return localWarehouseStockService.updateLocalStock(localWarehouseStock);
	}

	
}
