package com.smallbaazaar.scm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id")
	long productId;
	
	@Column(name="product_name")
	String productName;
	
	@Column(name="quantity")
	float quantity;
	
	@Column(name = "unit")
	String unit;
	
	@Column(name="product_image")
	String productImage;
	
	@Column(name = "product_type")
	String productType;

	public Product() {}

	public Product(String productName, float quantity, String unit, String productImage,
			String productType) {
		super();
		this.productName = productName;
		this.quantity = quantity;
		this.unit = unit;
		this.productImage = productImage;
		this.productType = productType;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public float getQuantity() {
		return quantity;
	}

	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", productName=" + productName 
				+ ", quantity=" + quantity + ", unit=" + unit + ", productImage=" + productImage + ", productType="
				+ productType + "]";
	}
	
	
}
