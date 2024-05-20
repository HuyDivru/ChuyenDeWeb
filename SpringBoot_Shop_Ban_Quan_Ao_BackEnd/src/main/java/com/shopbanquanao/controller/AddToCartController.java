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
import com.shopbanquanao.model.AddtoCart;

@RestController
@RequestMapping("api/addtocart")
public class AddToCartController {

    @Autowired
    CartService cartService;

    @PostMapping("addproduct")
    public ResponseEntity<?> addCartWithProduct(@RequestBody HashMap<String, String> addCartRequest) {
        try {
            String key[] = {"productId", "userId", "qty", "price"};
            if (ShoppingConfiguration.validationWithHashMap(key, addCartRequest)) {
                // validation logic here
            }

            long productId = Long.parseLong(addCartRequest.get("productId"));
            long userId = Long.parseLong(addCartRequest.get("userId"));
            int qty = Integer.parseInt(addCartRequest.get("qty"));
            double price = Double.parseDouble(addCartRequest.get("price"));

            List<AddtoCart> obj = cartService.addCartbyUserIdAndProductId(productId, userId, qty, price);
            return ResponseEntity.ok(obj);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }

    @DeleteMapping("removeProductFromCart")
    public ResponseEntity<?> removeCartWithProductId(@RequestBody HashMap<String, String> removeCartRequest) {
        try {
            String key[] = {"userId", "cartId"};
            if (ShoppingConfiguration.validationWithHashMap(key, removeCartRequest)) {
                // validation logic here
            }
            List<AddtoCart> obj = cartService.removeCartByUserId(Long.parseLong(removeCartRequest.get("userId")),
                    Long.parseLong(removeCartRequest.get("cartId")));
            return ResponseEntity.ok(obj);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }

    @PutMapping("updateQtyForCart")
    public ResponseEntity<?> updateQtyForCart(@RequestBody HashMap<String, String> addCartRequest) {
        try {
            String key[] = {"productId", "userId", "qty", "price"};
            if (ShoppingConfiguration.validationWithHashMap(key, addCartRequest)) {
                // validation logic here
            }

            long cartId = Long.parseLong(addCartRequest.get("cartId"));
            long userId = Long.parseLong(addCartRequest.get("userId"));
            int qty = Integer.parseInt(addCartRequest.get("qty"));
            double price = Double.parseDouble(addCartRequest.get("price"));

            cartService.updateQtyByCartId(cartId, qty, price);
            List<AddtoCart> obj = cartService.getCartByUserId(userId);
            return ResponseEntity.ok(obj);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }

    @GetMapping("getCartsByUserId")
    public ResponseEntity<?> getCartsByUserId(@RequestBody HashMap<String, String> getCartRequest) {
        try {
            String keys[] = {"userId"};
            if (ShoppingConfiguration.validationWithHashMap(keys, getCartRequest)) {
                // validation logic here
            }
            List<AddtoCart> obj = cartService.getCartByUserId(Long.parseLong(getCartRequest.get("userId")));
            return ResponseEntity.ok(obj);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }
}
