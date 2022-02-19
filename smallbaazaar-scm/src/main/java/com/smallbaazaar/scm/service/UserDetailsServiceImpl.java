/*
 * package com.smallbaazaar.scm.service;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.security.core.userdetails.UserDetails; import
 * org.springframework.security.core.userdetails.UserDetailsService; import
 * org.springframework.security.core.userdetails.UsernameNotFoundException;
 * import org.springframework.stereotype.Service;
 * 
 * import com.smallbaazaar.scm.entity.User; import
 * com.smallbaazaar.scm.respository.UserRepository; import
 * com.smallbaazaar.scm.security.UserPrincipal;
 * 
 * @Service public class UserDetailsServiceImpl implements UserDetailsService {
 * 
 * @Autowired private UserRepository userRepository;
 * 
 * @Override public UserDetails loadUserByUsername(String email) throws
 * UsernameNotFoundException {
 * 
 * User user = userRepository.findByEmail(email); if (user == null) throw new
 * UsernameNotFoundException("User with email '" + email + "' not found");
 * 
 * return new UserPrincipal(user); }
 * 
 * }
 */