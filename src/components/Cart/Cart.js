import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CartItem from "../CartItem/CartItem";
import axios from "axios";
import Confirmation from "../Confirmation/Confirmation";

const deliveryURL = "http://127.0.0.1:5000/delivery";
const paymentURL = "http://127.0.0.1:5000/payment";
const orderURL = "http://127.0.0.1:5000/order";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [payment, setPayment] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [isOrderPlaced, setIsOrderdPlaced] = useState(false);

  useEffect(() => {
    const cookies = Cookies.get("cart");
    if (cookies !== undefined) {
      refreshCart(JSON.parse(cookies));
    } else {
      refreshCart([]);
    }

    axios.get(deliveryURL).then((response) => {
      setDeliveries(response.data);
      setSelectedDelivery(response.data[0]);
    });

    axios.get(paymentURL).then((response) => {
      setPayments(response.data);
    });
  }, []);

  const handleOnClick = () => {
    setIsOrderdPlaced(true);
    Cookies.remove("cart");
  };

  const refreshCart = (newCart) => {
    setCart(newCart);
    countFinalPrice(newCart);
  };

  const countFinalPrice = (newCart) => {
    let price = 0;
    newCart.map((itemCart) => {
      price += itemCart._price * itemCart._quantity;
    });

    setFinalPrice(price);
  };

  const onChangeDelivery = (e) => {
    setSelectedDelivery(JSON.parse(e.target.value));
  };

  const handleDeleteFromCart = (idProduct) => {
    let newCart = cart.map(product => {
      if (product._id === idProduct){
        product._quantity -= 1;
      }
      return product
    })
    newCart = newCart.filter((product) => product._quantity > 0);
    Cookies.set("cart", JSON.stringify(newCart), { expires: 7, sameSite: 'strict'})
    setCart(newCart);
  };

  return (
    <section className="body">
      {!isOrderPlaced && cart.length !== 0 && (
        <div>
          <p id="page-name">Cart</p>
          <table className="table-products">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((itemCart) => {
                return (
                  <CartItem
                    key={itemCart._id}
                    id={itemCart._id}
                    name={itemCart._name}
                    photo={itemCart._photo}
                    price={itemCart._price}
                    quantity={itemCart._quantity}
                    onClickDelete={() => {handleDeleteFromCart(itemCart._id)}}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="deliveryMethod">
            {deliveries.map((delivery) => {
              return (
                <label className="deliveryInput">
                  <input
                    key={delivery.method}
                    type="radio"
                    value={JSON.stringify(delivery)}
                    checked={selectedDelivery.method === delivery.method}
                    onChange={onChangeDelivery}
                  />
                  {delivery.method} - {delivery.price} zł
                </label>
              );
            })}
          </div>
          <div className="summaryDiv">
            <p className="summary">Sum of products: {finalPrice}</p>
            <p className="summary">
              Cost of delivery: {selectedDelivery.price}
            </p>
            <p className="summary">
              Total: {(selectedDelivery.price + finalPrice).toFixed(2)}
            </p>
            <br></br>
            <button className="button-form" onClick={handleOnClick}>
              Order
            </button>
          </div>
        </div>
      )}
      {!isOrderPlaced && cart.length === 0 && <p id="page-name">No products in your cart.</p>}
      {isOrderPlaced && <Confirmation price={(selectedDelivery.price + finalPrice).toFixed(2)}/>}
    </section>
  );
};
export default Cart;
