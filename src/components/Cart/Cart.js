import { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = (props) => {
  const [isCheckout,setIsCheckout] = useState(false)
  const cartCtx = useContext(cartContext)
  const hastItems = cartCtx.items.length > 0
  const totalAmount  = `${cartCtx.totalAmount.toFixed(2)}`
 const cartItemRemoveHandler = (id) => {
  cartCtx.removeItem(id)
 }
 const cartItemAddHandler = (item)=> {
   cartCtx.addItem({...item,amount:1})
 }
  
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
         <CartItem 
         key={item.id}
         name={item.name}
         amount={item.amount}
         price={item.price} 
         onRemove={cartItemRemoveHandler.bind(null,item.id)}
         onAdd={() => cartItemAddHandler(item)}

         
         />))}
    </ul>
  ); 
  const orderHandler = () => {
   setIsCheckout(true)
  }
  const cartResut = async(cart) => {
  const response =await fetch('https://request-f1ef5-default-rtdb.firebaseio.com/request.json',{
    method:"POST",
    headers:{
      "Cotent-Type":"appalacation/json"
    },
    body:JSON.stringify(cart)
  })
  const data = await response.json()
  console.log(data)

  }
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
     {isCheckout && <Checkout onCancel={props.onCloseCart} onAdd={cartResut} />}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
       {hastItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
