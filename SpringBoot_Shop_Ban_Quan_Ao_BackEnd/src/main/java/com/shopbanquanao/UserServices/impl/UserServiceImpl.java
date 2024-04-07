package com.shopbanquanao.UserServices.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopbanquanao.UserServices.UserService;
import com.shopbanquanao.model.User;
import com.shopbanquanao.repository.UserRepository;

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

}
