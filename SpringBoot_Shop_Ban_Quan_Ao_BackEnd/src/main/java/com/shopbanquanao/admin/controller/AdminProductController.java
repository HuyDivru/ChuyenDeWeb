package com.shopbanquanao.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shopbanquanao.admin.repository.AdminProductRepository;
import com.shopbanquanao.admin.service.AdminProductService;
import com.shopbanquanao.model.Products;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminProductController {
	
	
	@Autowired
	AdminProductService productService;
	
	@PostMapping("/saveProduct")
	public ResponseEntity<?> saveEntity(@RequestBody Products product) {
		return new ResponseEntity<>(productService.saveProduct(product),HttpStatus.CREATED);
	}
	@GetMapping("/listProduct")
	public ResponseEntity<?> getAllProduct() {
		return new ResponseEntity<>(productService.getAllProduct(), HttpStatus.OK);
	}

	@GetMapping("/listProduct/{id}")
	public ResponseEntity<?> getProductById(@PathVariable Integer id) {
		return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
	}

	@DeleteMapping("/deleteProduct/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
		return new ResponseEntity<>(productService.deleteProduct(id), HttpStatus.OK);
	}

	@PutMapping("/editProduct/{id}")
	public ResponseEntity<?> editProduct(@RequestBody Products product, @PathVariable Integer id) {
		return new ResponseEntity<>(productService.editProduct(product, id), HttpStatus.CREATED);
	}
	
}
