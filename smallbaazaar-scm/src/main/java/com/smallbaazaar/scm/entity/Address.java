package com.smallbaazaar.scm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="address_id")
	private long addressId;
	
	@Column(name="address_title")
	private String addressTitle;
	
	@Column(name="street_address")
	private String streetAddress;
	
	private String locality;
	private String city;
	private int pincode;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@ManyToOne
    @JoinColumn(name = "address_user_id")
    private User user;
	
	public Address(){}

	public Address(String streetAddress, String locality, String city, int pincode, User user, String addressTitle) {
		
		this.streetAddress = streetAddress;
		this.locality = locality;
		this.city = city;
		this.pincode = pincode;
		this.user = user;
		this.addressTitle = addressTitle;
	}


	public long getAddressId() {
		return addressId;
	}

	public void setAddressId(long addressId) {
		this.addressId = addressId;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getAddressTitle() {
		return addressTitle;
	}

	public void setAddressTitle(String addressTitle) {
		this.addressTitle = addressTitle;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Address [addressId=" + addressId + ", addressTitle="+addressTitle+", streetAddress=" + streetAddress + ", locality=" + locality
				+ ", city=" + city + ", pincode=" + pincode + ", user=" + user + "]";
	}

	
}
