package com.shopbanquanao.userservice;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.shopbanquanao.model.User;


public interface UserService {

	User signUpUser(HashMap<String, String> signUpRequest) throws Exception;
	User findByMobile(String mobile) throws Exception;
	User getUserDetailById(long userId) throws Exception;
}
