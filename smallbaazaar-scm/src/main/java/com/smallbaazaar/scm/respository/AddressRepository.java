package com.smallbaazaar.scm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smallbaazaar.scm.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	
	List<Address> getAllAddressByUserId(long userId);
	
	Address getAddressByUserId(long userId);
	

}
