package com.shopbanquanao.userservice.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopbanquanao.model.User;
import com.shopbanquanao.repository.UserRepository;
import com.shopbanquanao.userservice.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepo;
	
	
	@Override
	public User signUpUser(HashMap<String, String> signUpRequest) throws Exception {
		try {
			if(userRepo.findByMobile(signUpRequest.get("mobile")).isPresent()) {
				throw new Exception("User is already registered with mobile no");
			}
			
			User user=new User();
			user.setName(signUpRequest.get("name"));
			user.setEmail(signUpRequest.get("email"));
			user.setMobile(signUpRequest.get("mobile"));
			user.setPassword(signUpRequest.get("password"));
			
			userRepo.save(user)	;
			return user;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}


	@Override
	public User findByMobile(String mobile) throws Exception {
		return userRepo.findByMobile(mobile).orElseThrow(() -> new Exception("User Not Found...."));
	}


	@Override
	public User getUserDetailById(long userId) throws Exception {
		return userRepo.findById(userId).orElseThrow(()->new Exception("User Not Found"));
	}


	@Override
	public List<User> getAllUser(){
		return userRepo.findAll();
	}


	

}
