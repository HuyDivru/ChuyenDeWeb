package com.shopbanquanao.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopbanquanao.model.CheckoutCart;


public interface AdminCheckoutRepository extends JpaRepository<CheckoutCart, Integer>{

}
