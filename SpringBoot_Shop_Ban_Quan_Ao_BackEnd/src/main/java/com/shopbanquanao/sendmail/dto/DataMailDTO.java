package com.shopbanquanao.sendmail.dto;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataMailDTO {
	private String to;
	private String subject;
	private String content;
	private Map<String, Object> props;
}
