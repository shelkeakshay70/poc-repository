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

import com.smallbaazaar.scm.entity.Address;
import com.smallbaazaar.scm.service.AddressService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AddressRestController {

	@Autowired
	AddressService addressService;

	@GetMapping("/address/{userId}")
	List<Address> getAllAddressOfUser(@PathVariable long userId){
		
		return addressService.getAllAddressByUser(userId);
	}
	
	@PutMapping("/address")
	String updateAddress(@RequestBody Address address) {
		Address addr = addressService.updateAddress(address);
		return "Address updated: "+addr.getAddressId();
	}
	
	@PostMapping("/address")
	String addAddress(@RequestBody Address address) {
		Address addr = addressService.addNewAddress(address);
		return "New Address added: "+addr.getAddressId();
	}
}
