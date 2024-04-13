package com.shopbanquanao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
public class User {
	@Id
	long id;
	String name;
	String email;
	String password;
	String created_at;
	String login_token;
	String type;
	String address;
	String is_email_verified;
	String mobile;
	
}
