package com.smallbaazaar.scm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smallbaazaar.scm.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	public User findByName(String name);
	public User findByEmail(String email);
	List<User> findByUserRole(String string);
	
}
