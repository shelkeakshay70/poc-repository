package com.smallbaazaar.scm.service;

import com.smallbaazaar.scm.entity.LocalWarehouseStock;

public interface LocalWarehouseStockService {

	LocalWarehouseStock getLocalStockByCentralId(long localWareUserId, long cetralWarehouseStockId);

	LocalWarehouseStock updateLocalStock(LocalWarehouseStock localWarehouseStock);

	String checkStockAvailabilityAtLocalWare(int pincode, long stockId, int quantity);
}
