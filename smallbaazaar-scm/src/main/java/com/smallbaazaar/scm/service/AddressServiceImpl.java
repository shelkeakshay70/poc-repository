package com.smallbaazaar.scm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.Address;
import com.smallbaazaar.scm.respository.AddressRepository;
import com.smallbaazaar.scm.respository.UserRepository;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	AddressRepository addressRepository;
	
	@Autowired
	UserRepository userRepository;

	@Override
	public List<Address> getAllAddressByUser(long userId) {
		
//		Optional<User> result = userRepository.findById(userId);
//		User user = null;
//		if (result.isPresent()) {
//			user = result.get();
//		} else {
//			throw new RuntimeException("User id did not match: " + userId);
//		}
//		System.err.println(user);
		return addressRepository.getAllAddressByUserId(userId);
	}

	@Override
	public Address updateAddress(Address address) {
		return addressRepository.save(address);
		
	}

	@Override
	public Address addNewAddress(Address address) {
		address.setAddressId(0);
		return addressRepository.save(address);
	}
	
	

}
