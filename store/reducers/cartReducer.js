import CartItem from "../../models/cart-item";
import {ADD_TO_CART} from '../actions/cartAction'

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
    }
    return state;

}