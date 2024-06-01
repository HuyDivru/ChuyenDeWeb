package com.shopbanquanao.sendmail.service;

import java.util.Optional;

import com.shopbanquanao.model.User;

public interface ClientService {
	
	Optional<User> findByEmail(String email) throws Exception;
	public void save(User user) throws Exception;
}
