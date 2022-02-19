package com.smallbaazaar.scm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smallbaazaar.scm.entity.User;
import com.smallbaazaar.scm.service.UserService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserRestController {

	@Autowired
	UserService userService;

	@GetMapping("/user-details/id/{id}")
	public User getUserDetailByID(@PathVariable long id) {
		return userService.findUserDetailsById(id);
	}

	@GetMapping("/user-details/{email}")
	public User getUserDetailByEmail(@PathVariable String email) {
		return userService.findUserDetailsByEmail(email);
	}
	
	@GetMapping("/users/{email}")
	public String getUserDetailByName(@PathVariable String email) {
		return userService.checkIfUserAlreadyExists(email);
	}
	
	@GetMapping("/users/suppliers")
	public List<User> getAllSuppliers() {
		return userService.getAllSuppliers();
	}

	@PostMapping("/users/add")
	public User addUser(@RequestBody User user) {
		userService.addNewUser(user);
		return user;
	}
	
	@PutMapping("/users/update")
	public User updateUserDetails(@RequestBody User user) {
		userService.updateUserDetails(user);
		return user;
	}

}
