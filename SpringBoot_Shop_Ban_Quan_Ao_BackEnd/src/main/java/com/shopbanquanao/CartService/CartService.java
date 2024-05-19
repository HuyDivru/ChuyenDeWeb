package com.shopbanquanao.CartService;

import java.util.List;

import com.shopbanquanao.model.AddToCart;

public interface CartService {

	List<AddToCart> addCartByUserIdAndProductId(long productId, long userId, int qty, double price) throws Exception;

	List<AddToCart> getCartByUserId(long userId) throws Exception;

	List<AddToCart> removeCartByUserId(long cartId, long userId) throws Exception;

	void updateQtyByCartId(long cartId, int qty, double price) throws Exception;

}
