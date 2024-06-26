package com.shopbanquanao.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.admin.service.AdminCheckoutService;
import com.shopbanquanao.userservice.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminCheckoutController {
	
	@Autowired
	private AdminCheckoutService checkoutService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/checkOut")
	public ResponseEntity<?> getAllCheckout(){
		return new ResponseEntity<>(checkoutService.getAllCheckout(),HttpStatus.OK);
	}
	
	@GetMapping("/checkOut/{id}")
	public ResponseEntity<?> getCheckoutById(@PathVariable Integer id){
		return new ResponseEntity<> (checkoutService.getCheckoutById(id), HttpStatus.OK);
	}
	
	
	//
	@GetMapping("/listUser")
	public ResponseEntity<?> getAllUser(){
		return new ResponseEntity<> (userService.getAllUser(), HttpStatus.OK);
	}
}
