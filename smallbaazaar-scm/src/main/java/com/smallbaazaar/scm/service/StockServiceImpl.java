package com.smallbaazaar.scm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.Stock;
import com.smallbaazaar.scm.respository.StockRepository;

@Service
public class StockServiceImpl implements StockService {
	
	@Autowired
	StockRepository stockRepository;

	@Override
	public List<Stock> getAllStocksByProductId(long productId) {
		return stockRepository.findAllStockByProductProductId(productId);
	}

	@Override
	public Stock getAllStocksById(long stockId) {
		
		Optional<Stock> result = stockRepository.findById(stockId);
		Stock stock = null;
		if (result.isPresent()) {
			stock = result.get();
		} else {
			throw new RuntimeException("Stock id did not match: " + stockId);
		}
		return stock;
	}

	@Override
	public List<Stock> getAllStocks() {
		return stockRepository.findAll();
	}

	@Override
	public Stock addNewStock(Stock stock) {
		stock.setStockId(0);
		return stockRepository.save(stock);
	}

	@Override
	public String deleteStockById(long stockId) {
		stockRepository.deleteById(stockId);
		return "Record deleted for stock id: "+stockId;
	}

	@Override
	public Stock updateStock(Stock stock) {
		
		return stockRepository.save(stock);
	}

}
