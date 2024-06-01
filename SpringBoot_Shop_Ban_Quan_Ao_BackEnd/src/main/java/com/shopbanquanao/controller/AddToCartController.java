package com.shopbanquanao.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.CartService.CartService;
import com.shopbanquanao.JWTConfiguration.ShoppingConfiguration;
import com.shopbanquanao.controller.requestPojo.ApiResponse;
import com.shopbanquanao.model.AddtoCart;

@CrossOrigin(origins = "http://localhost:3000")
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
    
    //thêm sản phẩm vào giỏ hàng và update lại nếu nó đã tồn tại
    @PostMapping("addOrUpdateProduct")
    public ResponseEntity<?> addOrUpdateCartWithProduct(@RequestBody HashMap<String, String> addCartRequest) {
        try {
            String key[] = {"productId", "userId", "qty", "price"};
            if (ShoppingConfiguration.validationWithHashMap(key, addCartRequest)) {
                return ResponseEntity.badRequest().body(new ApiResponse("Validation failed for required fields", ""));
            }

            long productId = Long.parseLong(addCartRequest.get("productId"));
            long userId = Long.parseLong(addCartRequest.get("userId"));
            int qty = Integer.parseInt(addCartRequest.get("qty"));
            double price = Double.parseDouble(addCartRequest.get("price"));

            
            String addedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            List<AddtoCart> cartItems = cartService.getCartByUserId(userId);
            boolean itemExists = false;
            for (AddtoCart item : cartItems) {
                if (item.getProduct().getId() == productId) {
                    cartService.updateQtyByCartId(item.getId(), item.getQty() + qty, price,addedDate);
                    cartService.updateCartItemQuantity(item.getId(),item.getQty()+qty);
                    itemExists = true;
                    break;
                }
            }

            if (!itemExists) {
                cartService.addCartbyUserIdAndProductId(productId, userId, qty, price);
            }

            List<AddtoCart> updatedCartItems = cartService.getCartByUserId(userId);
            return ResponseEntity.ok(updatedCartItems);
            
//            double totalPrice = cartService.calculateTotalPrice(userId);

            // Trả về thông tin giỏ hàng cùng với tổng giá trị
//            Map<String, Object> response = new HashMap<>();
//            response.put("cartItems", cartService.getCartByUserId(userId));
//            response.put("totalPrice", totalPrice);
//            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }
    //Lấy sản phẩm với user trong cart
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AddtoCart>> getCartWithProductInfoByUserId(@PathVariable Long userId) {
        List<AddtoCart> cartItems = cartService.getCartWithProductInfoByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }
    
 
    @DeleteMapping("removeProductFromCart")
    public ResponseEntity<?> removeCartWithProductId(@RequestBody HashMap<String, String> removeCartRequest) {
        try {
            String key[] = {"userId", "cartId"};
            if (ShoppingConfiguration.validationWithHashMap(key, removeCartRequest)) {
                // validation logic here
            }
            //debug
            Long userId = Long.parseLong(removeCartRequest.get("userId"));
            Long cartId = Long.parseLong(removeCartRequest.get("cartId"));
            System.out.println("User ID: " + userId + ", Cart ID: " + cartId);

            List<AddtoCart> cartBeforeDeletion = cartService.getCartByUserId(userId);
            System.out.println("Cart before deletion: " + cartBeforeDeletion);

            List<AddtoCart> obj = cartService.removeCartByUserId(cartId, userId);

            List<AddtoCart> cartAfterDeletion = cartService.getCartByUserId(userId);
            System.out.println("Cart after deletion: " + cartAfterDeletion);
            
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
            	return ResponseEntity.badRequest().body(new ApiResponse("Validation failed for required fields", ""));
            }
            String addedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            long cartId = Long.parseLong(addCartRequest.get("cartId"));
            long userId = Long.parseLong(addCartRequest.get("userId"));
            int qty = Integer.parseInt(addCartRequest.get("qty"));
            double price = Double.parseDouble(addCartRequest.get("price"));

            cartService.updateQtyByCartId(cartId, qty, price,addedDate);
            List<AddtoCart> obj = cartService.getCartByUserId(userId);
            return ResponseEntity.ok(obj);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }

    @PostMapping("getCartsByUserId")
    public ResponseEntity<?> getCartsByUserId(@RequestBody HashMap<String, String> getCartRequest) {
        try {
            String keys[] = {"userId"};
            if (ShoppingConfiguration.validationWithHashMap(keys, getCartRequest)) {
                // validation logic here
            }
            List<AddtoCart> cartItems = cartService.getCartByUserId(Long.parseLong(getCartRequest.get("userId")));
           
            
            List<Map<String, Object>> response = cartItems.stream().map(item -> {
                Map<String, Object> cartItem = new HashMap<>();
                cartItem.put("id", item.getId());
                cartItem.put("qty", item.getQty());
                cartItem.put("price", item.getPrice());
                cartItem.put("user_id", item.getUser_id());
                cartItem.put("added_date", item.getAdded_date());
                
                Map<String, Object> product = new HashMap<>();
                product.put("id", item.getProduct().getId());
                product.put("name", item.getProduct().getName());
                product.put("price", item.getProduct().getPrice());
                product.put("image_url", item.getProduct().getImage_url());
                
                cartItem.put("product", product);
                
                return cartItem;
            }).collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
        }
    }
    
 
}
