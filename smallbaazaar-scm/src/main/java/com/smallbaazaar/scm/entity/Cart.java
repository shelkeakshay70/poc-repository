package com.smallbaazaar.scm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cart_product_id")
	int cartProductId;
	
	@Column(name="product_quantity")
	int productQuantity;
	
	@ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
	
	@OneToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	public Cart() {
		
	}

	public Cart(int productQuantity, Product product,Stock stock, User user) {
		super();
		this.productQuantity = productQuantity;
		this.product = product;
		this.stock = stock;
		this.user = user;
	}


	public int getCartProductId() {
		return cartProductId;
	}

	public void setCartProductId(int cartProductId) {
		this.cartProductId = cartProductId;
	}

	public int getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Cart [cartProductId=" + cartProductId + ", productQuantity=" + productQuantity + ", product=" + product
				+ ", stock=" + stock + ", user=" + user + "]";
	}	

}
