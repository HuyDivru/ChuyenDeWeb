import { useEffect, useState } from 'react';
import { CartContextValue } from './ContextProvider';
import { httpPostwithToken } from './HttpConfig';
import { useHistory } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
export default function CheckoutCart() {
	const [cartData, dispatch] = CartContextValue();
	const [optionData, setOptionData] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
	let history = useHistory();
	const getTotalAmount = () => {
		return cartData.cartItems.reduce((prevValue, currentValue) => prevValue + currentValue.price, 0);
	}
	const qty_change = (cartObj, e) => {
		// console.log(cartObj,e.target.value);
		// cartObj.qty 
		let price = cartObj.price * e.target.value;
		let obj = { "cartId": cartObj.id, "qty": e.target.value, "price": price }
		httpPostwithToken("addtocart/updateQtyForCart", obj)
			.then((res) => {
				res.json().then(data => {
					if (res.ok) {
						dispatch({
							"type": "add_cart",
							"data": data
						})
						alert("Đã cập nhật lại giỏ hàng ")
					} else {
						alert(data.message)
					}
				})
			}).catch(function (res) {
				console.log("Error ", res);
				//alert(error.message);
			}
			)

	}
	const checkout_order = () => {
		// console.log(cartObj,e.target.value);
		// cartObj.qty 
		let totalAmount = getTotalAmount();
		let obj = { "total_price": totalAmount, "pay_type": "COD", "deliveryAddress": "testing address" }
		httpPostwithToken("order/checkout_order", obj)
			.then((res) => {
				res.json().then(data => {
					if (res.ok) {
						alert("Thanh toán thành công")
						history.push("/");
					} else {
						alert(data.message)
					}
				})
			}).catch(function (res) {
				console.log("Error ", res);
				//alert(error.message);
			}
			)

	}
	return (
		<>
			<Header />
			<div className="typo codes icons main-grid-border">
				<div className="container">
					<div>
						<h1 className='ato'>VIETTIEN.VN | GIỎ HÀNG </h1>
						c

						<div style={{ display: 'block' }} id="w3lssbmincart" className="check-out-cart-wrap">

							<ul>
								{
									cartData.cartItems.map(cartObj => (
										<li key={cartObj.id} className="sbmincart-item sbmincart-item-changed">
											<div className="sbmincart-details-name">
												<a className="sbmincart-name">{cartObj.productName}</a>
												<ul className="sbmincart-attributes">
												</ul>
											</div>
											<div className="sbmincart-details-quantity">
												<select value={cartObj.qty} onChange={(e) => qty_change(cartObj, e)}>
													{optionData.map(d => (<option>{d}</option>))}
												</select>
											</div>
											<div className="sbmincart-details-remove">
												<button type="button" className="sbmincart-remove" data-sbmincart-idx="0">×</button>
											</div>
											<div className="sbmincart-details-price">
												<span className="sbmincart-price">{cartObj.price}</span>
											</div>
										</li>
									))
								}

							</ul>
							<div className="sbmincart-footer">
								<div className="sbmincart-subtotal radio-wrap">
									<input name="pay_type" type="radio" /><span>Thanh Toán Online</span>
									<input type="radio" name="pay_type" /><span> Thanh Toán Sau</span>
								</div>
								<div className="sbmincart-subtotal">
									Thành Tiền : {getTotalAmount()}
									<div>
										<button onClick={() => checkout_order()}>MUA HÀNG </button>
									</div>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>

			< Footer />
		</>
	)
}