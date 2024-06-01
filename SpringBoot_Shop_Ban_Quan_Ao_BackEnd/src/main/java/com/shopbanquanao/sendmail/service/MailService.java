package com.shopbanquanao.sendmail.service;

import com.shopbanquanao.sendmail.dto.DataMailDTO;

import jakarta.mail.MessagingException;

public interface MailService {
	void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
