package com.shopbanquanao.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.UserServices.UserService;
import com.shopbanquanao.controller.requestPojo.ApiResponse;
import com.shopbanquanao.model.User;

@RestController
@RequestMapping("api/signup")
public class SingUpController {
	
	@Autowired
	UserService userService;
	
	 
	@RequestMapping("user")
	public ResponseEntity<?> userLogin(@RequestBody HashMap<String, String> signUpRequest){
		try {
			User user=userService.signUpUser(signUpRequest);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
		}
	}
}
