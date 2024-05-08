package com.shopbanquanao.productService;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopbanquanao.model.Products;
import com.shopbanquanao.repository.CategoryRepo;
import com.shopbanquanao.repository.ProductRepo;

@Service
public class ProductServies {
	
	@Autowired
	ProductRepo productRepo;
	@Autowired
	CategoryRepo cateRepo;
	public List<Products> getAllProducts() {
		return productRepo.findAll();
	}

	public List<Category> getAllCategory() {
		
		return null;
	}

	public List<Products> getProductsByCategory(String category_id) {
		// TODO Auto-generated method stub
		return null;
	}

}
