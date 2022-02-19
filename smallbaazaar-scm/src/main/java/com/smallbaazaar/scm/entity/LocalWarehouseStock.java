package com.smallbaazaar.scm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class LocalWarehouseStock {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="local_warehouse_stock_id")
	long localWareStockId;
	
	@OneToOne
    @JoinColumn(name = "central_warehouse_stock_id")
	Stock stock;
	
	@Column(name="current_quantity")
	int currentQuantity;
	
	@Column(name="reorder_level_quantity")
	int reorderLevelQuantity;
	
	@Column(name="maximum_level_quantity")
	int maximumLevelQuantity;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@ManyToOne
	@JoinColumn(name = "local_warehouse_user_id")
	User user;

	public LocalWarehouseStock() {}
	
	public LocalWarehouseStock(Stock stock, int currentQuantity, int reorderLevelQuantity,
			int maximumLevelQuantity, User user) {
		this.stock = stock;
		this.currentQuantity = currentQuantity;
		this.reorderLevelQuantity = reorderLevelQuantity;
		this.maximumLevelQuantity = maximumLevelQuantity;
		this.user = user;
	}

	public long getLocalWareStockId() {
		return localWareStockId;
	}

	public void setLocalWareStockId(long localWareStockId) {
		this.localWareStockId = localWareStockId;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public int getCurrentQuantity() {
		return currentQuantity;
	}

	public void setCurrentQuantity(int currentQuantity) {
		this.currentQuantity = currentQuantity;
	}

	public int getReorderLevelQuantity() {
		return reorderLevelQuantity;
	}

	public void setReorderLevelQuantity(int reorderLevelQuantity) {
		this.reorderLevelQuantity = reorderLevelQuantity;
	}

	public int getMaximumLevelQuantity() {
		return maximumLevelQuantity;
	}

	public void setMaximumLevelQuantity(int maximumLevelQuantity) {
		this.maximumLevelQuantity = maximumLevelQuantity;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "LocalWarehouseStock [localWareStockId=" + localWareStockId + ", stock=" + stock + ", currentQuantity="
				+ currentQuantity + ", reorderLevelQuantity=" + reorderLevelQuantity + ", maximumLevelQuantity="
				+ maximumLevelQuantity + ", user=" + user + "]";
	}

}
