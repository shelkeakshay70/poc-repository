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

import com.smallbaazaar.scm.entity.Cart;
import com.smallbaazaar.scm.service.CartService;

//@CrossOrigin(origins="http://localhost:4200", methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT})
@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CartRestController {
	
	@Autowired
	private CartService cartService;

	@GetMapping("/carts/{email}")
	public List<Cart> getAllProductsInCart(@PathVariable("email") String email) {
		return cartService.getAllCartProductsByEmail(email);
	}
	
	@GetMapping("/carts/id/{userId}")
	public List<Cart> getAllProductsInCartById(@PathVariable("userId") long userId) {
		return cartService.getAllCartProductsById(userId);
	}
	
	@PostMapping("/carts/add")
	public Cart addNewProductInCart(@RequestBody Cart cart){
		return cartService.addProductInCart(cart);
	}
	
	@PutMapping("/carts/remove")
	public String removeFromCart(@RequestBody Cart cart){
		return cartService.removeProductFromCart(cart);
	}
	
	@DeleteMapping("/carts/remove/all/{userId}")
	public String removeAllProductsOfUser(@PathVariable long userId) {
		cartService.removeAllProductsOfUser(userId);
		
		return "Cart items deleted for user: "+userId;
	}
}
