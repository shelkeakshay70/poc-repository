package com.smallbaazaar.scm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smallbaazaar.scm.entity.Stock;
import com.smallbaazaar.scm.service.StockService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class StockRestController {
	
	@Autowired
	StockService stockService;
	
	@GetMapping("/stocks")
	public List<Stock> getAllStocks(){
		return stockService.getAllStocks();
	}

	@GetMapping("/stocks/productId/{productId}")
	public List<Stock> getAllStocksByUser(@PathVariable long productId) {
		
		return stockService.getAllStocksByProductId(productId);
		
	}
	
	@GetMapping("/stocks/{stockId}")
	public Stock getAllStocksById(@PathVariable long stockId) {
		
		return stockService.getAllStocksById(stockId);	
	}
	
	@PostMapping("/stocks")
	public Stock addNewStock(@RequestBody Stock stock) {
		return stockService.addNewStock(stock);
	}
	
	@PutMapping("/stocks")
	public Stock updateStock(@RequestBody Stock stock) {
		return stockService.updateStock(stock);
	}
	
	@DeleteMapping("stocks/{stockId}")
	public String deleteStockById(@PathVariable long stockId) {
		
		return stockService.deleteStockById(stockId);	
	}
}
