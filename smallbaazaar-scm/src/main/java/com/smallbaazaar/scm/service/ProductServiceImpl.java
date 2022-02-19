package com.smallbaazaar.scm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.Product;
import com.smallbaazaar.scm.entity.Stock;
import com.smallbaazaar.scm.respository.ProductRepository;
import com.smallbaazaar.scm.respository.StockRepository;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	StockRepository stockRepository;

	@Override
	public List<Product> findAllProducts() {
		return productRepository.findAll();
	}
	
	@Override
	public Product getProductByProductId(long productId) {
		Optional<Product> result = productRepository.findById(productId);
		Product product = null;
		if (result.isPresent()) {
			product = result.get();
		} else {
			throw new RuntimeException("Stock id did not match: " + productId);
		}
		return product;
	}

	@Override
	public List<Product> findByProductType(String productType) {
		List<Product> products = productRepository.findByProductType(productType);
		List<Product> productsToDisplay = new ArrayList<Product>();
		for(Product p:products) {
			List<Stock> stocks= stockRepository.findAllStockByProductProductId(p.getProductId());
			if(stocks.size()>0) {
				productsToDisplay.add(p);
			}
		}
		 return productsToDisplay;
	}

	@Override
	public Product updateProduct(Product product) {
		Optional<Product> result = productRepository.findById(product.getProductId());
		Product oldProduct = null;
		if (result.isPresent()) {
			oldProduct = result.get();
		} else {
			throw new RuntimeException("Product id did not match: " + product.getProductId());
		}
		product.setProductImage(oldProduct.getProductImage());
		return productRepository.save(product);
	}

	@Override
	public Product addNewProduct(Product product) {
		product.setProductId(0);
		String productNameWithUnderScore = product.getProductName().toLowerCase().replace(' ', '_');
		String productImg = "/"+productNameWithUnderScore+".jpg";
		product.setProductImage(productImg);
		return productRepository.save(product);
	}

	@Override
	public String deleteProductById(long productId) {
		productRepository.deleteById(productId);
		return "Product deleted succesfully: "+productId;
	}
}
