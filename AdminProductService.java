package com.shopbanquanao.admin.service;

import java.util.List;

import com.shopbanquanao.model.Products;

public interface AdminProductService {
	
	public Products saveProduct(Products product);

	public List<Products> getAllProduct();

	public Products getProductById(Integer id);

	public String deleteProduct(Integer id);

	public Products editProduct(Products product, Integer id);
}
