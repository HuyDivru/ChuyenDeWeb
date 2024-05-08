package com.shopbanquanao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopbanquanao.model.Category;

public interface CategoryRepo extends JpaRepository<Category, Long>{

}
