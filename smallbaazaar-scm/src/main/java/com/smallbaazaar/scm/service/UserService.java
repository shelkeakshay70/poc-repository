
package com.smallbaazaar.scm.service;

import java.util.List;

import com.smallbaazaar.scm.entity.User;

public interface UserService {

	User findUserDetailsById(long id);

	User findUserDetailsByEmail(String email);
	
	String checkIfUserAlreadyExists(String email);

	void addNewUser(User user);

	void updateUserDetails(User user);

	List<User> getAllSuppliers();
}
