import { useContext, useState } from 'react';
import useCart from '../../CartCustom/usecart';
import classes from './Checkout.module.css';
const Checkout = (props) => {

const {
      value:entredName,
      valueHandler:entredNameHandler,
      isValidRes:Error,
      valueIsValid:onBlurName,
     
} = useCart((value) => value.trim() === '')

const {
    value:entredStreet,
    valueHandler:entredStreetHandler,
    isValidRes:ErrorStreet,
    valueIsValid:onBlurStreet,
   
} = useCart((value) => value.trim() === '')

const {
    value:entredPostal,
    valueHandler:entredPostalHandler,
    isValidRes:ErrorPostal,
    valueIsValid:onBlurPostal,
   
} = useCart((value) => value.length < 6)
const {
    value:entredCity,
    valueHandler:enteredCityHandler,
    isValidRes:ErrorCity,
    valueIsValid:onBlurCity,
   
} = useCart((value) => value.trim() === '')
    
    const confitmHandler = (event) => {
        event.preventDefault();

        const obj = {
            name:entredName,
            entredStreet:entredStreet,
            entredPostal:entredPostal,
            entredCity:entredCity,
        }
        props.onAdd(obj)
       
    }
    const ErrorIsName = Error ? classes.invalid : classes.control
    const ErrorIsStreet = ErrorStreet ? classes.invalid : classes.control
    const ErrorIsPostal = ErrorPostal ? classes.invalid : classes.control
    const ErrorCityOne = ErrorCity ? classes.invalid : classes.control

    return <form onSubmit={confitmHandler}>
        <div className={`${classes.control} ${ErrorIsName}`}>
            <label htmlFor="name">Your name</label>
            <input 
            type="text"
            id="name" 
            value={entredName}
            onChange={entredNameHandler}
            onBlur={onBlurName}
            />
        </div>
        <div className={`${classes.control} ${ErrorIsStreet}`}>
            <label htmlFor="street">Street</label>
            <input 
            type="text"
            id="street"
            value={entredStreet}
            onChange={entredStreetHandler}
            onBlur={onBlurStreet}
            />
        </div>
        <div className={`${classes.control} ${ErrorIsPostal}`}>
            <label htmlFor="postal">Postal code</label>
            <input 
            type="text"
            id="postal"
            value={entredPostal}
            onChange={entredPostalHandler}
            onBlur={onBlurPostal}
            />
        </div>
        <div className={`${classes.control} ${ErrorCityOne}`}>
            <label htmlFor="city">City</label>
            <input 
            type="text"
            id="city"
            value={entredCity}
            onChange={enteredCityHandler}
            onBlur={onBlurCity}
            />
        </div>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
    </form>
}
export default Checkout;