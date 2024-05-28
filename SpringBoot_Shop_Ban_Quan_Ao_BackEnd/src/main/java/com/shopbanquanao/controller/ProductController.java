package com.shopbanquanao.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.model.Category;
import com.shopbanquanao.model.Products;
import com.shopbanquanao.productService.ProductServices;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.commons.io.IOUtils;

@RestController
@RequestMapping("api/product")
public class ProductController{
	
	@Autowired
	ProductServices productServies;
	
	@GetMapping("getAll")
	public List<Products> getAllProducts(){
		return productServies.getAllProducts();
	}
	@GetMapping("getAllCategory")
	public List<Category> getAllCategory(){
		return productServies.getAllCategory();
	}
	@GetMapping("getProductsByCategory")
	public List<Products> getProductsByCategory(@RequestParam("cat_id") String category_id) {
	    return productServies.getProductsByCategory(category_id);
	}
	
	@GetMapping("getProductDetails/{id}") public Products getProductDetails(@PathVariable("id") long id) throws Exception {
		return productServies.getProductsById(id);
	}
	
	@GetMapping(value = "/getimage/{img_name}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable("img_name") String img_name) throws IOException {
	    InputStream in = getClass().getResourceAsStream("/images/" + img_name);
	    return IOUtils.toByteArray(in);
	}
	
	
}
