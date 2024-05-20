package com.shopbanquanao.admin.service;

import java.util.List;

import com.shopbanquanao.model.CheckoutCart;

public interface AdminCheckoutService {

	public List<CheckoutCart> getAllCheckout();

	public CheckoutCart getCheckoutById(Integer id);

}
