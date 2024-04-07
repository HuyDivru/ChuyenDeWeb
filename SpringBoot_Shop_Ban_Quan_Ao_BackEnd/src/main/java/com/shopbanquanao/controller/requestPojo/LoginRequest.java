package com.shopbanquanao.controller.requestPojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {	
	String mobile;
	String password;
}
