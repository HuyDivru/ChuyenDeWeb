package com.shopbanquanao.sendmail.utils;

import java.util.Random;

public class DataUtils {
	
	public static String generatePassword(int length) {
		String number="0123456789";
		char otp[]=new char[length];
		Random rd=new Random();
		for (int i = 0; i < otp.length; i++) {
			otp[i]=number.charAt(rd.nextInt(number.length()));
		}
		String otpCode="";
		for (int i = 0; i < otp.length; i++) {
			otpCode+=otp[i];
		}	
		return otpCode;
	}
}
