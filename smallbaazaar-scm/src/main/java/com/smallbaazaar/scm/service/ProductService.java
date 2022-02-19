package com.smallbaazaar.scm.service;

import java.util.List;

import com.smallbaazaar.scm.entity.Product;

public interface ProductService {

	List<Product> findAllProducts();

	List<Product> findByProductType(String productType);

	Product getProductByProductId(long productId);

	Product updateProduct(Product product);

	Product addNewProduct(Product product);

	String deleteProductById(long productId);

}
