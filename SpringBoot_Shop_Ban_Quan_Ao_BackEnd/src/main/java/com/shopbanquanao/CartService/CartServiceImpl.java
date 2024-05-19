package com.shopbanquanao.CartService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.shopbanquanao.model.AddToCart;
import com.shopbanquanao.model.Products;
import com.shopbanquanao.productService.ProductServies;
import com.shopbanquanao.repository.AddToCartRepo;


public class CartServiceImpl implements CartService{
	
	@Autowired
	AddToCartRepo addCartRepo;
//	@Autowired
//	CheckoutRepo checkOutRepo;
	@Autowired
	ProductServies proServies;
	
	private static final Logger logger= LoggerFactory.getLogger(CartServiceImpl.class);
	
	
	@Override
	public List<AddToCart> addCartByUserIdAndProductId(long productId, long userId, int qty, double price) throws Exception {
		try {
			if(addCartRepo.getCartByProductIdAnduserId(userId,productId).isPresent()) {
				throw new Exception("Sản phẩm đã tồn tại mời bạn chọn lại.");
			}
			AddToCart obj=new AddToCart();
			obj.setQty(qty);
			obj.setUser_id(userId);
			Products pro=proServies.getProductsById(productId);
			obj.setProduct(pro);
			addCartRepo.save(obj);
			return this.getCartByUserId(userId);
		
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(""+e.getMessage());
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public List<AddToCart> getCartByUserId(long userId) {
		return addCartRepo.getCartByuserId(userId);
	}

	@Override
	public List<AddToCart> removeCartByUserId(long cartId, long userId) {
		addCartRepo.deleteCartByIdAndUserId(userId, cartId);
		return this.getCartByUserId(userId);
	}

	@Override
	public void updateQtyByCartId(long cartId, int qty, double price) throws Exception{
		addCartRepo.updateQtyByCartId(cartId, price, qty);
	}

}
