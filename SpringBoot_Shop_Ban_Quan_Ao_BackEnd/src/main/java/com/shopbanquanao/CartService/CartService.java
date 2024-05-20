package com.shopbanquanao.CartService;

import java.util.List;

import com.shopbanquanao.model.AddToCart;
import com.shopbanquanao.model.CheckoutCart;

public interface CartService {

	List<AddToCart> addCartByUserIdAndProductId(long productId, long userId, int qty, double price) throws Exception;

	List<AddToCart> getCartByUserId(long userId) throws Exception;

	List<AddToCart> removeCartByUserId(long cartId, long userId) throws Exception;

	void updateQtyByCartId(long cartId, int qty, double price) throws Exception;

	Boolean checkTotalAmountAgainstCart(double total_amt, long userId);

	List<CheckoutCart> saveProductsForCheckout(List<CheckoutCart> tmp) throws Exception;
	
	List<AddToCart> removeAllCartByUserId(long userId);
	
	List<CheckoutCart> getAllCheckoutByUserId(long userId);

}
