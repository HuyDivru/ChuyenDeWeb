package com.shopbanquanao.sendmail.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.model.User;
import com.shopbanquanao.sendmail.dto.DataMailDTO;
import com.shopbanquanao.sendmail.service.ClientService;
import com.shopbanquanao.sendmail.service.MailService;
import com.shopbanquanao.sendmail.utils.Const;
import com.shopbanquanao.sendmail.utils.DataUtils;

@RestController
@RequestMapping("/api")
public class SendMailController {
	
	
	@Autowired
	private ClientService clientService;
	
	@Autowired
	private MailService mailService;
	
	@PostMapping("forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestParam("email") String email){
		try {
			Optional<User> optionalUser=clientService.findByEmail(email);
			
			if(optionalUser.isPresent()) {
				User user=optionalUser.get();
				
				String password=DataUtils.generatePassword(6);
				user.setPassword(password);
				clientService.save(user);
				
				DataMailDTO dataMail= new DataMailDTO();
				dataMail.setTo(email);
				dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);
				
				Map<String, Object> props = new HashMap<>();
				props.put("name", user.getName());
				props.put("password", password);
				
				dataMail.setProps(props);
				
				mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
				
				
				return ResponseEntity.ok("Password reset token sent to email!");
			}
			else {
                return ResponseEntity.badRequest().body("Email not found!");
            }
		} 
		
		catch (Exception e) {
			return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
		}
	}
	
	
}
