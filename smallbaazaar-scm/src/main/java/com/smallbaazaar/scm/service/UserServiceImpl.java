
package com.smallbaazaar.scm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.User;
import com.smallbaazaar.scm.respository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User findUserDetailsById(long id) {

		Optional<User> result = userRepository.findById(id);
		User user = null;
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new RuntimeException("User id did not match: " + id);
		}
		return user;
	}


	@Override
	public User findUserDetailsByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	@Override
	public String checkIfUserAlreadyExists(String email) {
		if(userRepository.findByEmail(email)==null) {
			return "User not found";
		}
		return "User found"; 

	}

	@Override
	public void addNewUser(User user) {
		System.err.println(user);
		
		user.setId(0);
		
		switch(user.getUserRole()) {
		
		case "Customer":
			user.setUserRole("CUST");
			break;
		case "Local Warehouse":
			user.setUserRole("LOCALWARE");
			break;
		case "Central Warehouse":
			user.setUserRole("CENTWARE");
			break;
		case "Supplier":
			user.setUserRole("SUPPLIER");
			break;
		}
		
		userRepository.save(user);
	}


	@Override
	public void updateUserDetails(User user) {
		
		Optional<User> result = userRepository.findById(user.getId());
		User oldUser = null;
		if (result.isPresent()) {
			oldUser = result.get();
		} else {
			throw new RuntimeException("User id did not match: " + user.getId());
		}
		
		user.setUserRole(oldUser.getUserRole());
		if(user.getPassword()==null) {
			user.setPassword(oldUser.getPassword());
		}
		
		userRepository.save(user);
	}


	@Override
	public List<User> getAllSuppliers() {
	
		return userRepository.findByUserRole("SUPPLIER");
	}

}
