package com.shopbanquanao.CartService;

import java.util.List;

import org.springframework.stereotype.Service;
import com.shopbanquanao.model.AddtoCart;
import com.shopbanquanao.model.CheckoutCart;

@Service
public interface CartService {

	List<AddtoCart> addCartbyUserIdAndProductId(long productId,long userId,int qty,double price) throws Exception;
	
	
	void updateQtyByCartId(long cartId,int qty,double price,String added_date) throws Exception;
	
	List<AddtoCart> getCartByUserId(long userId);
	
	List<AddtoCart> removeCartByUserId(long cartId,long userId);
	
	List<AddtoCart> removeAllCartByUserId(long userId);
	
	Boolean checkTotalAmountAgainstCart(double totalAmount,long userId);
	
	List<CheckoutCart> getAllCheckoutByUserId(long userId);
	
	List<CheckoutCart> saveProductsForCheckout(List<CheckoutCart> tmp)  throws Exception;
	
	
	List<AddtoCart> getCartWithProductInfoByUserId(Long userId);


	void updateCartItemQuantity(long cartId, int newQuantity);



	
	
	
	
	//
//	List<CartItemProjection> getCartItemsByUserIdProjection(long userId);
}
