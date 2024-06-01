package com.shopbanquanao.sendmail.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopbanquanao.model.User;
import com.shopbanquanao.sendmail.repository.ClientRepository;
import com.shopbanquanao.sendmail.service.ClientService;

@Service
public class ClientServiceImpl implements ClientService{
	
	@Autowired
	ClientRepository clientRepo;
	

	@Override
	public Optional<User> findByEmail(String email) throws Exception {
		try {
			return clientRepo.findByEmail(email);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public void save(User user) throws Exception {
		try {
			clientRepo.save(user);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
	
	
}
