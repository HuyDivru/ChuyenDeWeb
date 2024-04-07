package com.shopbanquanao.controller.requestPojo;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse {
	private String message, token;
	JSONArray array = null;
	HashMap<String, String> data = null;
	JSONObject jsonobj = null;
	private List<String> errors;

	public ApiResponse(String message, List<String> errors) {
		super();
		this.message = message;
		this.errors = errors;
	}

	public ApiResponse(HashMap<String, String> data, String token) {
		super();
		this.token = token;
		this.data = data;
	}

	public ApiResponse(JSONObject jsonobj, String token) {
		this.jsonobj = jsonobj;
		this.token = token;
	}

	public ApiResponse(String token, String message, List<String> errors) {
		super();
		this.token = token;
		this.message = message;
		this.errors = errors;
	}

	 public ApiResponse( String message, String error) {
	        super();
	        //this.status = status;
	        this.message = message;
	        errors = Arrays.asList(error);
	    }
}
