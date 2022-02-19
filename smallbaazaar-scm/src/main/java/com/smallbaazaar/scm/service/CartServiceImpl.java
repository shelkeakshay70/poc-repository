package com.smallbaazaar.scm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.Cart;
import com.smallbaazaar.scm.entity.User;
import com.smallbaazaar.scm.respository.CartRepository;
import com.smallbaazaar.scm.respository.UserRepository;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<Cart> getAllCartProductsByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return cartRepository.findAllCartsByUserId(user.getId());
	}

	@Override
	public List<Cart> getAllCartProductsById(long userId) {
		return cartRepository.findAllCartsByUserId(userId);
	}
	
	@Override
	public Cart addProductInCart(Cart cart) {
		long userId = cart.getUser().getId();
		long productId = cart.getProduct().getProductId();
		List<Cart> cartProducts = cartRepository.findAllCartsByUserId(userId);
		for (Cart p : cartProducts) {
			if (p.getProduct().getProductId() == productId) {
				cart.setCartProductId(p.getCartProductId());
			}
		}
		return cartRepository.save(cart);
	}

	@Override
	public String removeProductFromCart(Cart cart) {
		long userId = cart.getUser().getId();
		long productId = cart.getProduct().getProductId();
		List<Cart> cartProducts = cartRepository.findAllCartsByUserId(userId);
		int quantity = cart.getProductQuantity();
		if (quantity == 0) {
			for (Cart p : cartProducts) {
				if (p.getProduct().getProductId() == productId) {
					cart.setCartProductId(p.getCartProductId());
				}
			}
			cartRepository.delete(cart);
		} else {

			for (Cart p : cartProducts) {
				if (p.getProduct().getProductId() == productId) {
					cart.setCartProductId(p.getCartProductId());
				}
			}
			cartRepository.save(cart);
		}

		return "Product updated: " + cart.getCartProductId();
	}

	@Override
	public void removeAllProductsOfUser(long userId) {
		List<Cart> cartProducts = cartRepository.findAllCartsByUserId(userId);
		
		for(Cart cartItem : cartProducts) {
			cartRepository.delete(cartItem);
		}
	}

}
