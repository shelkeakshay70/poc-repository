package com.smallbaazaar.scm.service;

import java.util.List;

import com.smallbaazaar.scm.entity.Cart;

public interface CartService {

	List<Cart> getAllCartProductsByEmail(String email);
	Cart addProductInCart(Cart cart);
	String removeProductFromCart(Cart cart);
	void removeAllProductsOfUser(long userId);
	List<Cart> getAllCartProductsById(long userId);
}
