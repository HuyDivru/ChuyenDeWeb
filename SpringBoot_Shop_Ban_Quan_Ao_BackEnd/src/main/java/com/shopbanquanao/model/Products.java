package com.shopbanquanao.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="products")
@Data
@NoArgsConstructor
public class Products {
	
	@Id
	long id;
	String name,added_on,category_id;
	double price;
	
}
