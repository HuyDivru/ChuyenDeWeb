package com.shopbanquanao.UserServices;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.shopbanquanao.model.User;

@Service
public interface UserService {

	User signUpUser(HashMap<String, String> signUpRequest) throws Exception;
	
}
