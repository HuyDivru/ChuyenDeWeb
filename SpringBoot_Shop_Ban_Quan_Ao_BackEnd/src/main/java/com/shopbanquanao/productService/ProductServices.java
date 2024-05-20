package com.shopbanquanao.productService;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopbanquanao.model.Category;
import com.shopbanquanao.model.Products;
import com.shopbanquanao.repository.CategoryRepo;
import com.shopbanquanao.repository.ProductRepo;

@Service
public class ProductServices {
	
	@Autowired
	ProductRepo productRepo;
	@Autowired
	CategoryRepo cateRepo;
	public List<Products> getAllProducts() {
		return productRepo.findAll();
	}

	public List<Category> getAllCategory() {
		return cateRepo.findAll();
	}

	public List<Products> getProductsByCategory(String product_id) {
		return productRepo.getByCategoryId(product_id);
	}	
	public Products getProductsById(long productId) throws Exception{
		return productRepo.findById(productId).orElseThrow(()->new Exception("Product is not found"));
	}
}
