/*
 * package com.smallbaazaar.scm.security;
 * 
 * import java.util.Collection; import java.util.Collections;
 * 
 * import org.springframework.security.core.GrantedAuthority; import
 * org.springframework.security.core.authority.SimpleGrantedAuthority; import
 * org.springframework.security.core.userdetails.UserDetails;
 * 
 * import com.smallbaazaar.scm.entity.User;
 * 
 * public class UserPrincipal implements UserDetails {
 * 
 * User user;
 * 
 * public UserPrincipal(User user) { this.user = user; }
 * 
 * @Override public Collection<? extends GrantedAuthority> getAuthorities() {
 * return Collections.singleton(new SimpleGrantedAuthority(user.getUserRole()));
 * }
 * 
 * @Override public String getPassword() { // TODO Auto-generated method stub
 * return user.getPassword(); }
 * 
 * @Override public String getUsername() { // TODO Auto-generated method stub
 * return user.getEmail(); }
 * 
 * @Override public boolean isAccountNonExpired() { return true; }
 * 
 * @Override public boolean isAccountNonLocked() { return true; }
 * 
 * @Override public boolean isCredentialsNonExpired() { return true; }
 * 
 * @Override public boolean isEnabled() { return true; }
 * 
 * }
 */