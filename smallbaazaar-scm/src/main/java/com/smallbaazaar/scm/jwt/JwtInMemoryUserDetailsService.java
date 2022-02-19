package com.smallbaazaar.scm.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.User;
import com.smallbaazaar.scm.respository.UserRepository;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

	/*
	 * static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
	 * 
	 * static { inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
	 * "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e",
	 * "ROLE_USER_2")); }
	 * 
	 * @Override public UserDetails loadUserByUsername(String username) throws
	 * UsernameNotFoundException { Optional<JwtUserDetails> findFirst =
	 * inMemoryUserList.stream() .filter(user ->
	 * user.getUsername().equals(username)).findFirst();
	 * 
	 * if (!findFirst.isPresent()) { throw new
	 * UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username)); }
	 * 
	 * return findFirst.get(); }
	 */

  @Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(email);
		if (user == null)
			throw new UsernameNotFoundException("User with email '" + email + "' not found");

		return new JwtUserDetails(user);
	}

}


