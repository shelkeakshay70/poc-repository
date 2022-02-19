package com.smallbaazaar.scm.service;

import java.util.List;

import com.smallbaazaar.scm.entity.Stock;

public interface StockService {

	List<Stock> getAllStocksByProductId(long productId);

	Stock getAllStocksById(long stockId);

	List<Stock> getAllStocks();

	Stock addNewStock(Stock stock);

	String deleteStockById(long stockId);

	Stock updateStock(Stock stock);
}
