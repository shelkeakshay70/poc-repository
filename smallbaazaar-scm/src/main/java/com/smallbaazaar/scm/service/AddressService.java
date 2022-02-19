package com.smallbaazaar.scm.service;

import java.util.List;

import com.smallbaazaar.scm.entity.Address;

public interface AddressService {
	
	List<Address> getAllAddressByUser(long userId);
	
	Address updateAddress(Address address);
	
	Address addNewAddress(Address address);

}
