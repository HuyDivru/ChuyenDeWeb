package com.shopbanquanao.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.CartService.CartService;
import com.shopbanquanao.JWTConfiguration.ShoppingConfiguration;
import com.shopbanquanao.controller.requestPojo.ApiResponse;
import com.shopbanquanao.model.AddToCart;
//restfullapi
@RestController
@RequestMapping("api/addtocart")
public class AddToCartController {
	
	
	@Autowired
	CartService cartService;
	//trả về sản phẩm được thêm vào cart
	@PostMapping("addproduct")
	public ResponseEntity<?> addCartWithProduct(@RequestBody HashMap<String, String> addCartRequest){
		try {
			String key[]= {"productId","userId","qty","price"};
			if(ShoppingConfiguration.validationWithHashMap(key, addCartRequest)) {
				
			}
			
			long productId=Long.parseLong(addCartRequest.get("productId"));
			long userId=Long.parseLong(addCartRequest.get("userId"));
			int qty=Integer.parseInt(addCartRequest.get("qty"));
			double price=Double.parseDouble(addCartRequest.get("price"));
			
			List<AddToCart> obj=cartService.addCartByUserIdAndProductId(productId,userId,qty,price);
			return ResponseEntity.ok(obj);
			
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(),""));
		}
	}
	
	//lấy ra cart với userid tương ứng
	@GetMapping("getCartsByUserId")
	public ResponseEntity<?> getCartByUserId(@RequestBody HashMap<String, String> getCartRequest){
		
		
		try {
			String key[]= {"userId"};
			if(ShoppingConfiguration.validationWithHashMap(key, getCartRequest)) {
				
			}
			List<AddToCart> obj=cartService.getCartByUserId(Long.parseLong(getCartRequest.get("userId")));
			return ResponseEntity.ok(obj);
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(),""));
		}
	}
	
	//Xóa product ra khỏi cart
	@DeleteMapping("removeProductFromCart")
	public ResponseEntity<?> removeCartWithProductId(@RequestBody HashMap<String, String> removeCartRequest){

		try {
			String key[]= {"userId","cartId"};
			if(ShoppingConfiguration.validationWithHashMap(key, removeCartRequest)) {
				
			}
			List<AddToCart> obj=cartService.removeCartByUserId(Long.parseLong(removeCartRequest.get("userId")),Long.parseLong(removeCartRequest.get("cartId")));
			return ResponseEntity.ok(obj);
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(),""));
		}
	}
	
	//update số lượng product trong cart
	@PutMapping("updateQtyForCart")
	public ResponseEntity<?> updateQtyForCart(@RequestBody HashMap<String, String> addCartRequest){
		try {
			String key[]= {"productId","userId","qty","price"};
			if(ShoppingConfiguration.validationWithHashMap(key, addCartRequest)) {
				
			}

			long cartId=Long.parseLong(addCartRequest.get("cartId"));
			long userId=Long.parseLong(addCartRequest.get("userId"));
			int qty=Integer.parseInt(addCartRequest.get("qty"));
			double price=Double.parseDouble(addCartRequest.get("price"));
			
			cartService.updateQtyByCartId(cartId,qty,price);
			List<AddToCart> obj=cartService.getCartByUserId(userId);
			return ResponseEntity.ok(obj);
			
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(),""));
		}
	}
	
	@RequestMapping("getCartsByUserId")
	public ResponseEntity<?> getCartsByUserId(@RequestBody  HashMap<String, String> getCartRequest){
		try {
			String key[]= {"userId"};
			if(ShoppingConfiguration.validationWithHashMap(key, getCartRequest)) {
				
			}
			List<AddToCart> obj=cartService.getCartByUserId(Long.parseLong(getCartRequest.get("userId")));
			return ResponseEntity.ok(obj);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
		}
	}
}
