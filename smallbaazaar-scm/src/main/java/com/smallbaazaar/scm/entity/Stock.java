package com.smallbaazaar.scm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Stock {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="stock_id")
	private long stockId;
	
	//@JsonProperty(access = Access.WRITE_ONLY)
	@ManyToOne
    @JoinColumn(name = "product_id")
	private Product product;
	 
	@ManyToOne
    @JoinColumn(name = "supplier_id")
	private User user;
	
	private String brand;
	
	private int quantity;

	@Column(name="price_per_unit")
	private float unitPrice;
	
	public Stock() {
		
	}
	public Stock(Product product, User user, String brand, int quantity, float unitPrice) {
		this.product = product;
		this.user = user;
		this.brand = brand;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
	}
	public long getStockId() {
		return stockId;
	}
	public void setStockId(long stockId) {
		this.stockId = stockId;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(float unitPrice) {
		this.unitPrice = unitPrice;
	}
	@Override
	public String toString() {
		return "Stock [stockId=" + stockId + ", product=" + product + ", user=" + user + ", brand=" + brand
				+ ", quantity=" + quantity + ", unitPrice=" + unitPrice + "]";
	}	
}
