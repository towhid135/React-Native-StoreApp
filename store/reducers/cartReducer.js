import CartItem from "../../models/cart-item";
import {ADD_TO_CART} from '../actions/cartAction';
import {DELETE_FROM_CART} from '../actions/cartAction';
import { ADD_ORDER } from "../actions/ordersAction";


const initialState = {
    item: {},
    totalAmount: 0
}

export default (state=initialState,action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updatedOrNewCartItem={};
            if (state.item[addedProduct.id]){
                //product already added
                updatedOrNewCartItem = new CartItem(
                    state.item[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.item[addedProduct.id].sum + prodPrice
                );
                //console.log(updatedOrNewCartItem);
            }
            else{
                updatedOrNewCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice);
                //console.log(updatedOrNewCartItem);
            }
            return {
                ...state,
                item: {...state.item,[addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice,
            }
        case DELETE_FROM_CART:
            const selectedItem = state.item[action.productId]
            const quantity = state.item[action.productId].quantity;
            if(quantity > 1){
                const updatedCartItems = new CartItem(
                    selectedItem.quantity -1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice
                )
                return {...state,item:{...state.item,[action.productId]: updatedCartItems},
                totalAmount: state.totalAmount - selectedItem.productPrice
            };
            }
            else{
                const updatedCartItems = {...state.item};
                delete updatedCartItems[action.productId];
                return {...state,item: updatedCartItems,
                    totalAmount: state.totalAmount - selectedItem.productPrice
                };
            }
        case ADD_ORDER:
            return initialState;
    }
    return state;

}