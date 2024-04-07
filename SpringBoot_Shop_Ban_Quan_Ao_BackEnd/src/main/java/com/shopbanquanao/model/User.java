package com.shopbanquanao.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name="users")
@Data
@Setter
@Getter
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
