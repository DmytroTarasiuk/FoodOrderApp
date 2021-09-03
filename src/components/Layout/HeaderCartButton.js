import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import { FaCartPlus } from 'react-icons/fa'
import CartContext from '../../store/cart-ctx'

const HeaderCartButton = props => {
    const [btnIsOn, setBtnIsOn] = useState(false)
    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0)

    const { items } = cartCtx

    const btnClasses = `${classes.button} ${btnIsOn ? classes.bump : ''}`
    
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsOn(true)

        const timer = setTimeout(() => {
            setBtnIsOn(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><FaCartPlus /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton