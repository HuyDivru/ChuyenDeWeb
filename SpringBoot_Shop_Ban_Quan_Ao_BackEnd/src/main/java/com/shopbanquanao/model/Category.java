package com.shopbanquanao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "category")
public class Category {
	@Id
	long id;
	String name;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
