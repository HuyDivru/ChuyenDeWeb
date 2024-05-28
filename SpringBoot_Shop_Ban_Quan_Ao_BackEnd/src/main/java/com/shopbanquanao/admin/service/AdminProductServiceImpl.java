package com.shopbanquanao.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopbanquanao.admin.repository.AdminProductRepository;
import com.shopbanquanao.model.Products;

@Service
public class AdminProductServiceImpl implements AdminProductService{

	@Autowired
	AdminProductRepository productRepo;
	
	@Override
	public Products saveProduct(Products product) {
		return productRepo.save(product);
	}

	@Override
	public List<Products> getAllProduct() {
		return productRepo.findAll();
	}

	@Override
	public Products getProductById(Integer id) {
		return productRepo.findById(id).get();
	}

	@Override
	public String deleteProduct(Integer id) {
		Products product=productRepo.findById(id).get();
		if(product!=null) {
			productRepo.delete(product);
			return "Product Delete Successfully";
		}
		return "Something wrong on server";
	}

	@Override
	public Products editProduct(Products product, Integer id) {
		Products oldProduct=productRepo.findById(id).get();
		
		oldProduct.setName(product.getName());
		oldProduct.setPrice(product.getPrice());
		oldProduct.setAdded_on(product.getAdded_on());
		oldProduct.setCategory_id(product.getCategory_id());
		oldProduct.setImage_url(product.getImage_url());
		
		return productRepo.save(oldProduct);
	}
	
}
