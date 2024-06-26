package com.shopbanquanao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shopbanquanao.model.AddtoCart;


import jakarta.transaction.Transactional;

@Repository
public interface AddToCartRepo  extends JpaRepository<AddtoCart, Long>{
	
	@Query("Select sum(addCart.price) FROM AddtoCart addCart WHERE addCart.user_id=:user_id")
	double getTotalAmountByUserId(@Param("user_id")Long user_id);
	
	@Query("SELECT addCart FROM AddtoCart addCart JOIN FETCH addCart.product WHERE addCart.user_id = :user_id")
    List<AddtoCart> getCartByuserId(@Param("user_id") Long user_id);
	
	@Query("Select addCart  FROM AddtoCart addCart ")
	Optional<AddtoCart> getCartByuserIdtest();
	
	@Query("Select addCart  FROM AddtoCart addCart WHERE addCart.product.id= :product_id and addCart.user_id=:user_id")
	Optional<AddtoCart> getCartByProductIdAnduserId(@Param("user_id")Long user_id,@Param("product_id")Long product_id);
	
	@Modifying
    @Transactional
    @Query("DELETE FROM AddtoCart addCart WHERE addCart.user_id = :user_id AND addCart.id = :cart_id")
    void deleteCartByIdAndUserId(@Param("user_id") Long userId, @Param("cart_id") Long cartId);
	
	@Modifying
    @Transactional
	@Query("DELETE  FROM AddtoCart addCart WHERE   addCart.user_id=:user_id")
	void deleteAllCartByUserId(@Param("user_id")Long user_id);
	
	@Modifying
    @Transactional
	@Query("DELETE  FROM AddtoCart addCart WHERE addCart.user_id=:user_id")
	void deleteAllCartUserId(@Param("user_id")Long user_id);
	
	@Modifying
	@Transactional
	@Query("update AddtoCart addCart set addCart.qty=:qty, addCart.price=:price, addCart.added_date=:added_date WHERE addCart.id=:cart_id")
	void updateQtyByCartId(@Param("cart_id") Long cart_id, @Param("price") double price, @Param("qty") Integer qty, @Param("added_date") String added_date);

	
	@Query("SELECT cart FROM AddtoCart cart JOIN FETCH cart.product WHERE cart.user_id = :user_id")
    List<AddtoCart> getCartWithProductInfoByUserId(@Param("user_id") Long user_id);
	
	
	
	
	
//	@Modifying
//    @Transactional
//	 @Query("SELECT a.qty as qty, a.price as price, p.name as productName, p.image_url as productImageUrl " +
//	           "FROM AddToCart a JOIN a.product p WHERE a.user_id = :user_id")
//	List<CartItemProjection> findCartItemsByUserId(@Param("user_id") Long user_id);
}
