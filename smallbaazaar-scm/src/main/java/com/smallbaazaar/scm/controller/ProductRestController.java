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

import com.smallbaazaar.scm.entity.Product;
import com.smallbaazaar.scm.service.ProductService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class ProductRestController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping("/products")
	List<Product> getAllProducts(){
		return productService.findAllProducts();
	}
	
	@GetMapping("/products/{productId}")
	Product getProductByProductId(@PathVariable long productId){
		return productService.getProductByProductId(productId);
	}
	
	
	@GetMapping("/products/farm-products")
	List<Product> getAllFarmProducts(){
		
		return productService.findByProductType("FARM");
	}
	
	@GetMapping("/products/dairy-products")
	List<Product> getAllDairyProducts(){
		
		return productService.findByProductType("DAIRY");
	}

	@PutMapping("/products")
	Product updateProduct(@RequestBody Product product){
		return productService.updateProduct(product);
	}
	
	@PostMapping("/products")
	Product addNewProduct(@RequestBody Product product){
		return productService.addNewProduct(product);
	}
	
	@DeleteMapping("/products/{productId}")
	String deleteProductById(@PathVariable long productId){
		return productService.deleteProductById(productId);
	}

}
