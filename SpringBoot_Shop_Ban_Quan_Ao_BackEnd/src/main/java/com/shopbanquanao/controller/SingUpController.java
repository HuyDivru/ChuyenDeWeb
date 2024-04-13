package com.shopbanquanao.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.controller.requestPojo.ApiResponse;
import com.shopbanquanao.model.User;
import com.shopbanquanao.userservice.UserService;

@RestController
@RequestMapping("api/signup")
public class SingUpController {
	
	@Autowired
	UserService userService;
	
//	@RequestMapping("user")
	@PostMapping("user")
	public ResponseEntity<?> userLogin(@RequestBody HashMap<String, String> signUpRequest){
		try {
			User user=userService.signUpUser(signUpRequest);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
		}
	}
}
