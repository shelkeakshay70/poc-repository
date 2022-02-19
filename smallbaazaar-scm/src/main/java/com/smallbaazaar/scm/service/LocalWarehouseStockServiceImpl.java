package com.smallbaazaar.scm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smallbaazaar.scm.entity.Address;
import com.smallbaazaar.scm.entity.LocalWarehouseStock;
import com.smallbaazaar.scm.entity.User;
import com.smallbaazaar.scm.respository.AddressRepository;
import com.smallbaazaar.scm.respository.LocalWarehouseStockRepository;
import com.smallbaazaar.scm.respository.UserRepository;

@Service
public class LocalWarehouseStockServiceImpl implements LocalWarehouseStockService{
	
	@Autowired
	LocalWarehouseStockRepository localWarehouseStockRepositoty;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AddressRepository addressRepository;

	@Override
	public LocalWarehouseStock getLocalStockByCentralId(long localWareUserId, long cetralWarehouseId) {
		
		return localWarehouseStockRepositoty.findByUserIdAndStockStockId(localWareUserId, cetralWarehouseId);
	}

	@Override
	public LocalWarehouseStock updateLocalStock(LocalWarehouseStock localWarehouseStock) {

		return localWarehouseStockRepositoty.save(localWarehouseStock);
	}

	@Override
	public String checkStockAvailabilityAtLocalWare(int pincode, long stockId, int quantity) {
		
		List<User> localWareUsers = userRepository.findByUserRole("LOCALWARE");
		User localWarehouse = null;
		for(User user : localWareUsers) {
			Address address = addressRepository.getAddressByUserId(user.getId());
			if(address.getPincode() == pincode) {
				localWarehouse = user;
				System.err.println("local warehouse found at: "+pincode);
				LocalWarehouseStock localStock = localWarehouseStockRepositoty.findByUserIdAndStockStockId(localWarehouse.getId(), stockId);
				if(localStock==null) {
					return "Not Available";
					//System.err.println("No stock found for: "+stockId);
				}
				else {
					
					if (localStock.getCurrentQuantity() < quantity) {
						//System.err.println("Enough quantity not found");
						return "No enough quantity availble";
					}
					else {
						//System.err.println("stock found for: "+localStock.getStock().getProduct().getProductName());
						return "Available";
					}
				}
					
			}
		}

		
		return "Not Deliverible at: "+pincode;
	}

}
